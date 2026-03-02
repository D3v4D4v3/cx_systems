<?php

namespace App\Http\Middleware;

use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * The names of the query string parameters that should be ignored.
     *
     * @var array<int, string>
     */
    // Este middleware se encarga de validar la firma de las URL para proteger contra manipulaciones. Sin embargo, hay ciertos parámetros de la cadena de consulta que no deben ser considerados al validar la firma, como los parámetros de seguimiento de campañas (utm_*) o el identificador de clic de Facebook (fbclid), ya que estos pueden ser agregados por terceros y no afectan la integridad de la URL. Por eso, se especifica una lista de parámetros que deben ser ignorados durante la validación utilizando la propiedad $except.
    protected $except = [
        // 'fbclid',
        // 'utm_campaign',
        // 'utm_content',
        // 'utm_medium',
        // 'utm_source',
        // 'utm_term',
    ];
}
