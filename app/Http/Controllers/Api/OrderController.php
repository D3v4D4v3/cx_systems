<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::withCount('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order)
    {
        $user = $request->user();

        if (!$user->isVendor() && $order->user_id !== $user->id) {
            return response()->json([
                'message' => 'No tienes permisos para ver este pedido',
            ], 403);
        }

        return response()->json([
            'order' => $order->load(['user', 'items.product.category']),
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->isClient()) {
            return response()->json([
                'message' => 'Solo los clientes pueden crear pedidos',
            ], 403);
        }

        $request->validate([
            'shipping_address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
            'payment_id' => 'nullable|string', // ID de pago de la pasarela mock
            'payment_method' => 'nullable|string|in:credit_card,debit_card',
        ]);

        $user = $request->user();

        $cartItems = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'El carrito está vacío',
            ], 422);
        }

        try {
            $order = DB::transaction(function () use ($cartItems, $request, $user) {
                $total = 0;

                foreach ($cartItems as $item) {
                    $product = Product::lockForUpdate()->find($item->product_id);

                    if (!$product || !$product->is_active) {
                        throw new Exception("El producto {$item->product->name} no está disponible");
                    }

                    if (!$product->hasStock($item->quantity)) {
                        throw new Exception("Stock insuficiente para {$product->name}");
                    }

                    $total += $item->quantity * $product->price;
                }

                // Crear pedido con estado pendiente
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => $total,
                    'status' => 'pendiente', // Estado inicial según specs del PDF
                    'shipping_address' => $request->shipping_address,
                    'phone' => $request->phone,
                    'notes' => $request->notes,
                    'payment_id' => $request->payment_id,
                    'payment_method' => $request->payment_method ?? 'credit_card',
                ]);

                foreach ($cartItems as $item) {
                    $product = Product::lockForUpdate()->find($item->product_id);

                    $subtotal = $item->quantity * $product->price;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $item->quantity,
                        'unit_price' => $product->price,
                        'subtotal' => $subtotal,
                    ]);

                    $product->decrement('stock', $item->quantity);
                }

                Cart::where('user_id', $user->id)->delete();

                return $order;
            });
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        return response()->json([
            'message' => 'Pedido creado exitosamente',
            'order' => $order->load('items.product.category'),
        ], 201);
    }

    /**
     * Actualizar estado del pedido (solo vendedores)
     */
    public function updateStatus(Request $request, Order $order)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para actualizar el estado de pedidos',
            ], 403);
        }

        $request->validate([
            'status' => 'required|string|in:pendiente,procesando,enviado,entregado,cancelado',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Estado del pedido actualizado exitosamente',
            'order' => $order->load('items.product.category'),
        ]);
    }

    /**
     * Listar todos los pedidos (solo vendedores)
     */
    public function allOrders(Request $request)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para ver todos los pedidos',
            ], 403);
        }

        $orders = Order::with(['user', 'items.product'])
            ->withCount('items')
            ->latest()
            ->paginate($request->get('per_page', 15));

        return response()->json($orders);
    }
}
