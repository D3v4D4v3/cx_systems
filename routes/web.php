<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Todas las rutas que no sean /api o /storage devuelven el SPA de React.
| Esto permite que React Router maneje la navegación del lado del cliente.
|
*/

Route::get('/{any}', function () {
    $path = public_path('frontend/index.html');

    if (! file_exists($path)) {
        abort(503, 'Frontend no construido. Ejecuta: cd frontend-src && npm run build');
    }

    return response()->file($path, [
        'Content-Type' => 'text/html; charset=utf-8',
        'Cache-Control' => 'no-store, no-cache, must-revalidate',
    ]);
})->where('any', '^(?!api|storage).*$');