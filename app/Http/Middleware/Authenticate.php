<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    // Si la solicitud espera una respuesta JSON (como en el caso de una API), no se redirige a la página de inicio de sesión, sino que se devuelve una respuesta JSON con un mensaje de error y un código de estado 401 (no autorizado)
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }
}
