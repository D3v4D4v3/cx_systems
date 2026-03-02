<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Clientes ven sus órdenes, vendedores ven órdenes relacionadas a sus productos
    public function index(Request $request): JsonResponse
    {
        $orders = Order::withCount('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'orders' => $orders
        ]);
    }

    // Detalles de una orden específica (clientes solo ven sus órdenes, vendedores ven órdenes relacionadas a sus productos)
    public function show(Request $request, Order $order): JsonResponse
    {
        $user = $request->user();

        if (! $user->isVendor() && $order->user_id !== $user->id) {
            return response()->json(['message' => 'No tienes permisos para ver este pedido'], 403);
        }

        return response()->json([
            'order' => $order->load(['user:id,name,email', 'items.product.category']),
        ]);
    }

    // Crear una nueva orden a partir del carrito del usuario autenticado
    public function store(Request $request): JsonResponse
    {
        if (! $request->user()->isClient()) {
            return response()->json(['message' => 'Solo los clientes pueden crear pedidos'], 403);
        }

        $validated = $request->validate([
            'shipping_address' => 'nullable|string|max:500',
            'phone'            => 'nullable|string|max:20',
            'notes'            => 'nullable|string|max:1000',
            'payment_id'       => 'nullable|string|max:100',
            'payment_method'   => 'nullable|string|in:credit_card,debit_card',
        ]);

        $user      = $request->user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'El carrito está vacío'], 422);
        }

        try {
            $order = DB::transaction(function () use ($cartItems, $validated, $user) {
                $total    = 0;
                $products = [];

                // 1. Validar stock y calcular total (un solo lock por producto)
                foreach ($cartItems as $item) {
                    // Bloquear el producto para evitar condiciones de carrera en stock
                    $product = Product::lockForUpdate()->find($item->product_id);

                    if (! $product || ! $product->is_active) {
                        throw new Exception("El producto '{$item->product->name}' ya no está disponible.");
                    }

                    if (! $product->hasStock($item->quantity)) {
                        throw new Exception("Stock insuficiente para '{$product->name}'. Disponible: {$product->stock}.");
                    }

                    $total          += $item->quantity * $product->price;
                    $products[$item->product_id] = $product;
                }

                // 2. Crear la orden
                $order = Order::create([
                    'user_id'          => $user->id,
                    'total_amount'     => $total,
                    'status'           => 'pendiente',
                    'shipping_address' => $validated['shipping_address'] ?? null,
                    'phone'            => $validated['phone'] ?? null,
                    'notes'            => $validated['notes'] ?? null,
                    'payment_id'       => $validated['payment_id'] ?? null,
                    'payment_method'   => $validated['payment_method'] ?? 'credit_card',
                ]);

                // 3. Crear items y descontar stock (usando los productos ya bloqueados)
                foreach ($cartItems as $item) {
                    $product  = $products[$item->product_id];
                    $subtotal = $item->quantity * $product->price;

                    OrderItem::create([
                        'order_id'   => $order->id,
                        'product_id' => $product->id,
                        'quantity'   => $item->quantity,
                        'unit_price' => $product->price,
                        'subtotal'   => $subtotal,
                    ]);

                    $product->decrement('stock', $item->quantity);
                }

                // 4. Vaciar el carrito
                Cart::where('user_id', $user->id)->delete();

                return $order;
            });
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([
            'message' => 'Pedido creado exitosamente',
            'order'   => $order->load('items.product.category'),
        ], 201);
    }

    // Solo los vendedores pueden actualizar el estado de una orden
    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        if (! $request->user()->isVendor()) {
            return response()->json(['message' => 'No tienes permisos para actualizar el estado de pedidos'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|string|in:pendiente,procesando,enviado,entregado,cancelado',
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json([
            'message' => 'Estado del pedido actualizado exitosamente',
            'order'   => $order->load('items.product.category'),
        ]);
    }

    // Solo los vendedores pueden ver todas las órdenes (con paginación)
    public function allOrders(Request $request): JsonResponse
    {
        if (! $request->user()->isVendor()) {
            return response()->json(['message' => 'No tienes permisos para ver todos los pedidos'], 403);
        }

        $orders = Order::with(['user:id,name,email', 'items.product'])
            ->withCount('items')
            ->latest()
            ->paginate($request->integer('per_page', 15));

        return response()->json($orders);
    }
}
