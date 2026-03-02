<?php

// Archivo de rutas para comandos de consola. Aquí se pueden definir comandos personalizados para Artisan.

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

// Comando que muestra una cita inspiradora.
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
