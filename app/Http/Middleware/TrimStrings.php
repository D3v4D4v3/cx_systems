<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

// Este middleware se encarga de eliminar los espacios en blanco al principio y al final de las cadenas de texto en las solicitudes entrantes. Sin embargo, hay ciertos campos que no deben ser recortados, como las contraseñas, para evitar problemas al procesar la autenticación o al guardar datos sensibles. Por eso, se especifica una lista de campos que deben ser excluidos del recorte utilizando la propiedad $except.
class TrimStrings extends Middleware
{
    /**
     * The names of the attributes that should not be trimmed.
     *
     * @var array<int, string>
     */
    protected $except = [
        'current_password',
        'password',
        'password_confirmation',
    ];
}
