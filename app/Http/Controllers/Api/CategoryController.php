<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Listar todas las categorías activas
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->withCount('products')
            ->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

    // Crear categoría (solo vendedores)
    public function store(Request $request)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para crear categorías',
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($request->all());

        return response()->json([
            'message' => 'Categoría creada exitosamente',
            'category' => $category,
        ], 201);
    }

    // Actualizar categoría (solo vendedores)
    public function update(Request $request, Category $category)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para actualizar categorías',
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $category->update($request->all());

        return response()->json([
            'message' => 'Categoría actualizada exitosamente',
            'category' => $category,
        ]);
    }

    // Eliminar categoría (solo vendedores)
    public function destroy(Request $request, Category $category)
    {
        if (!$request->user()->isVendor()) {
            return response()->json([
                'message' => 'No tienes permisos para eliminar categorías',
            ], 403);
        }

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada exitosamente',
        ]);
    }
}