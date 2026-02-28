<?php

// Archivo de rutas para la aplicación web. Todas las rutas que no sean /api o /storage devuelven el SPA de React.

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    $path = public_path('frontend/index.html');

    if (! file_exists($path)) {
        abort(503, 'Frontend no construido. Ejecuta: cd frontend-src && npm run build');
    }

    return response()->file($path, [
        // Asegura que el navegador interprete el archivo como HTML y no lo almacene en caché para evitar problemas de actualización.
        'Content-Type' => 'text/html; charset=utf-8',
        'Cache-Control' => 'no-store, no-cache, must-revalidate',
    ]);
})->where('any', '^(?!api|storage).*$'); // Excluye rutas que comienzan con /api o /storage