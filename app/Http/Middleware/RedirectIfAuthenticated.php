<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // Este middleware verifica si el usuario ya está autenticado. Si es así, lo redirige a la página de inicio (definida en RouteServiceProvider::HOME). Si no está autenticado, permite que la solicitud continúe normalmente hacia el siguiente middleware o controlador.
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) { // Si el usuario está autenticado, se redirige a la página de inicio
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request); // Si el usuario no está autenticado, se permite que la solicitud continúe hacia el siguiente middleware o controlador
    }
}
