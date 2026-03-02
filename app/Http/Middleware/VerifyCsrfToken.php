<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    // Este middleware se encarga de verificar el token CSRF en las solicitudes entrantes para proteger contra ataques de falsificación de solicitudes entre sitios. Sin embargo, hay ciertas rutas o URIs que no requieren esta verificación, como las rutas de API o las rutas que manejan webhooks, ya que estas pueden ser accedidas por terceros y no necesitan la protección CSRF. Por eso, se especifica una lista de URIs que deben ser excluidos de la verificación utilizando la propiedad $except.
    protected $except = [
        //
    ];
}
