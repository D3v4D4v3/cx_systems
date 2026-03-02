<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    // Esta constante define la ruta a la que se redirige a los usuarios después de autenticarse. En este caso, se está estableciendo como la raíz del sitio ('/'), lo que significa que los usuarios serán redirigidos a la página de inicio después de iniciar sesión correctamente.
    public const HOME = '/';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    // El método boot() se encarga de configurar las rutas de la aplicación. En este caso, se están definiendo dos grupos de rutas: uno para las rutas de API (con el prefijo 'api' y el middleware 'api') y otro para las rutas web (con el middleware 'web'). Esto permite organizar las rutas de la aplicación de manera clara y aplicar diferentes configuraciones o middleware según el tipo de ruta.
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    // El método configureRateLimiting() se encarga de configurar los limitadores de velocidad para la aplicación. En este caso, se está definiendo un limitador de velocidad para las rutas de API que permite un máximo de 60 solicitudes por minuto por usuario o por dirección IP. Esto ayuda a proteger la aplicación contra abusos o ataques de denegación de servicio al limitar la cantidad de solicitudes que un usuario o una IP pueden hacer en un período de tiempo determinado.
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
