<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array<int, string>|string|null
     */
    protected $proxies;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    // Este middleware se encarga de configurar los proxies confiables para la aplicación y los encabezados que se deben utilizar para detectar los proxies. En este caso, se están utilizando varios encabezados comunes relacionados con proxies, como X-Forwarded-For, X-Forwarded-Host, X-Forwarded-Port, X-Forwarded-Proto y X-Forwarded-AWS-ELB, lo que permite que la aplicación funcione correctamente detrás de proxies o balanceadores de carga que utilizan estos encabezados para transmitir información sobre la solicitud original.
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}
