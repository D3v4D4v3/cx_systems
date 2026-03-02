<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // Este middleware verifica si el usuario autenticado tiene el rol requerido para acceder a la ruta. Si no tiene el rol adecuado, se redirige al usuario a la página de dashboard con un mensaje de error indicando que no tiene permiso para acceder a esa página. Si el usuario tiene el rol correcto, se permite que la solicitud continúe hacia el siguiente middleware o controlador.
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!auth()->check() || auth()->user()->role !== $role) { // Verifica si el usuario no está autenticado o si su rol no coincide con el rol requerido
            return redirect('dashboard')->with('error', 'No tienes permiso para acceder a esta página.');

        }

        return $next($request);
    }
}
