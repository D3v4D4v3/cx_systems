<?php

// El punto de entrada para las solicitudes HTTP a la aplicación Laravel. Este archivo se encarga de cargar el framework y manejar la solicitud entrante.

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Si la aplicación está en modo de mantenimiento, se carga el archivo de mantenimiento para mostrar una página de "Mantenimiento en progreso" a los usuarios.
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Autoloader de Composer, para cargar las dependencias del proyecto.
require __DIR__.'/../vendor/autoload.php';

// Carga la aplicación Laravel, que devuelve una instancia del contenedor de servicios.
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

// Captura la solicitud HTTP entrante, la procesa a través del kernel de Laravel y envía la respuesta al cliente.
$response = $kernel->handle(
    $request = Request::capture()
)->send();

// Termina el kernel, lo que permite realizar cualquier limpieza necesaria después de enviar la respuesta.
$kernel->terminate($request, $response);
