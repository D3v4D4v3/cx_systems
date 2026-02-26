<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'search'     => 'nullable|string|max:100',
            'category_id'=> 'nullable|integer|exists:categories,id',
            'sort_by'    => 'nullable|string|in:created_at,price,name,stock',
            'sort_order' => 'nullable|string|in:asc,desc',
            'per_page'   => 'nullable|integer|min:1|max:100',
        ]);

        $query = Product::with(['category', 'vendor:id,name'])
            ->where('is_active', true);

        if ($search = $request->search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        if ($categoryId = $request->category_id) {
            $query->where('category_id', $categoryId);
        }

        $allowedSort = ['created_at', 'price', 'name', 'stock'];
        $sortBy    = in_array($request->sort_by, $allowedSort) ? $request->sort_by : 'created_at';
        $sortOrder = $request->sort_order === 'asc' ? 'asc' : 'desc';

        $products = $query
            ->orderBy($sortBy, $sortOrder)
            ->paginate($request->integer('per_page', 50));

        return response()->json($products);
    }

    public function show(Product $product): JsonResponse
    {
        if (! $product->is_active) {
            return response()->json(['message' => 'Producto no disponible'], 404);
        }

        return response()->json([
            'product' => $product->load(['category', 'vendor:id,name']),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        if (! $request->user()->isVendor()) {
            return response()->json(['message' => 'No tienes permisos para crear productos'], 403);
        }

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'price'       => 'required|numeric|min:0.01',
            'stock'       => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        ]);

        $validated['vendor_id'] = $request->user()->id;
        $validated['slug']      = Str::slug($validated['name']);

        if ($request->hasFile('image')) {
            $validated['image'] = $this->storeProductImage($request);
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Producto creado exitosamente',
            'product' => $product->load(['category', 'vendor:id,name']),
        ], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        if (! $request->user()->isVendor() || $product->vendor_id !== $request->user()->id) {
            return response()->json(['message' => 'No tienes permisos para actualizar este producto'], 403);
        }

        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:5000',
            'price'       => 'sometimes|required|numeric|min:0.01',
            'stock'       => 'sometimes|required|integer|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'is_active'   => 'sometimes|boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        if ($request->hasFile('image')) {
            $this->deleteProductImage($product->image);
            $validated['image'] = $this->storeProductImage($request);
        }

        $product->update($validated);

        return response()->json([
            'message' => 'Producto actualizado exitosamente',
            'product' => $product->load(['category', 'vendor:id,name']),
        ]);
    }

    public function destroy(Request $request, Product $product): JsonResponse
    {
        if (! $request->user()->isVendor() || $product->vendor_id !== $request->user()->id) {
            return response()->json(['message' => 'No tienes permisos para eliminar este producto'], 403);
        }

        $this->deleteProductImage($product->image);
        $product->delete();

        return response()->json(['message' => 'Producto eliminado exitosamente']);
    }

    // ── Image helpers ────────────────────────────────────────────────────────

    private function storeProductImage(Request $request): string
    {
        $image     = $request->file('image');
        $directory = public_path('images/products');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
        $image->move($directory, $filename);

        return 'images/products/' . $filename;
    }

    private function deleteProductImage(?string $imagePath): void
    {
        if (! $imagePath) {
            return;
        }

        $normalized = ltrim($imagePath, '/');

        if (str_starts_with($normalized, 'images/products/')) {
            $fullPath = public_path($normalized);
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }
    }
}