<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'vendor'])
            ->where('is_active', true);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $products = $query->paginate($request->get('per_page', 50));

        return response()->json($products);
    }

    public function show(Product $product)
    {
        return response()->json([
            'product' => $product->load(['category', 'vendor']),
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para crear productos',
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();
        $data['vendor_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        $product = Product::create($data);

        return response()->json([
            'message' => 'Producto creado exitosamente',
            'product' => $product->load(['category', 'vendor']),
        ], 201);
    }

    public function update(Request $request, Product $product)
    {
        if (!$request->user()->isVendor() || $product->vendor_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permisos para actualizar este producto',
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'sometimes|boolean',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        $product->update($data);

        return response()->json([
            'message' => 'Producto actualizado exitosamente',
            'product' => $product->load(['category', 'vendor']),
        ]);
    }

    public function destroy(Request $request, Product $product)
    {
        if (!$request->user()->isVendor() || $product->vendor_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permisos para eliminar este producto',
            ], 403);
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado exitosamente',
        ]);
    }
}