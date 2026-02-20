<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = Cart::with('product.category')
            ->where('user_id', $request->user()->id)
            ->get();

        $total = $cart->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'cart' => $cart,
            'total' => (float) $total,
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->isClient()) {
            return response()->json([
                'message' => 'Solo los clientes pueden usar el carrito',
            ], 403);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::where('is_active', true)->find($request->product_id);

        if (!$product) {
            return response()->json([
                'message' => 'Producto no disponible',
            ], 404);
        }

        $cartItem = Cart::firstOrNew([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
        ]);

        $newQuantity = $cartItem->exists
            ? $cartItem->quantity + $request->quantity
            : $request->quantity;

        if (!$product->hasStock($newQuantity)) {
            return response()->json([
                'message' => 'Stock insuficiente para este producto',
            ], 422);
        }

        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        return response()->json([
            'message' => 'Producto agregado al carrito',
            'item' => $cartItem->load('product.category'),
        ], 201);
    }

    public function update(Request $request, Cart $cart)
    {
        if ($cart->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No puedes modificar este elemento del carrito',
            ], 403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $cart->product;

        if (!$product || !$product->is_active) {
            return response()->json([
                'message' => 'Producto no disponible',
            ], 422);
        }

        if (!$product->hasStock($request->quantity)) {
            return response()->json([
                'message' => 'Stock insuficiente para este producto',
            ], 422);
        }

        $cart->update([
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'message' => 'Cantidad actualizada',
            'item' => $cart->load('product.category'),
        ]);
    }

    public function destroy(Request $request, Cart $cart)
    {
        if ($cart->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No puedes eliminar este elemento del carrito',
            ], 403);
        }

        $cart->delete();

        return response()->json([
            'message' => 'Producto eliminado del carrito',
        ]);
    }
}
