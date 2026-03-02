<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustHosts extends Middleware
{
    /**
     * Get the host patterns that should be trusted.
     *
     * @return array<int, string|null>
     */
    // Este middleware se encarga de definir los patrones de host que deben ser considerados como confiables por la aplicación. En este caso, se está utilizando el método allSubdomainsOfApplicationUrl() para confiar en todos los subdominios de la URL de la aplicación, lo que es útil para permitir que la aplicación funcione correctamente en diferentes entornos o con diferentes subdominios sin tener que especificar cada uno manualmente.
    public function hosts(): array
    {
        return [
            $this->allSubdomainsOfApplicationUrl(),
        ];
    }
}
