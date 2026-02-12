<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Evitar que GET /api/login muestre error de Laravel (p. ej. redirección 301 que convierte POST en GET)
Route::get('/login', fn () => response()->json(['message' => 'Use POST para iniciar sesión.'], 405));

// Rutas públicas de productos
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Rutas públicas de categorías
Route::get('/categories', [CategoryController::class, 'index']);

// Rutas protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Categorías (vendedores)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Productos (vendedores)
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{product}', [ProductController::class, 'update']); // POST para soportar multipart/form-data
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // TODO Integrante B: Carrito (GET/POST/DELETE) y Pedidos (POST /api/orders, historial)
});