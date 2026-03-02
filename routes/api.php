<?php

// Archivo de rutas para la API RESTful de la tienda en línea.

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentController;

// Rutas públicas (no requieren autenticación)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', fn () => response()->json(['message' => 'Usa POST /api/login para iniciar sesión.'], 405)); // Evita que GET /api/login devuelva un error 404, proporcionando una respuesta clara.

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Métodos de pago: información pública (no datos sensibles)
Route::get('/payment/methods', [PaymentController::class, 'getPaymentMethods']);



// Rutas protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {

    // Auth Endpoints (para manejar el estado de autenticación del usuario)
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::get('/me', [AuthController::class, 'me']);

    // Categorías (solo vendedores pueden modificar)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Productos (solo vendedores pueden crear/editar/eliminar)
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Carrito de compras (solo clientes pueden modificar su carrito)
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cart}', [CartController::class, 'update']);
    Route::delete('/cart/{cart}', [CartController::class, 'destroy']);

    // Órdenes (usuarios pueden crear órdenes, vendedores pueden ver órdenes relacionadas a sus productos)
    Route::post('/orders', [OrderController::class, 'store']); 
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::get('/orders/all/list', [OrderController::class, 'allOrders']);
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

    // Pagos (requiere autenticación para evitar abuso)
    Route::post('/payment/process', [PaymentController::class, 'processPayment']);
    Route::get('/payment/verify/{paymentId}', [PaymentController::class, 'verifyPayment']);
});