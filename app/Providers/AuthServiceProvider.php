<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    // Aquí se pueden registrar servicios relacionados con la autenticación y autorización, como gates o policies personalizados para controlar el acceso a diferentes partes de la aplicación según las reglas definidas.
    public function boot(): void
    {
        $this->registerPolicies(); // Registra las políticas de autorización definidas en la propiedad $policies para que puedan ser utilizadas en la aplicación

        //
    }
}
