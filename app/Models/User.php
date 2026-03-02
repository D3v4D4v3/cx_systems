<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens; // HasApiTokens para autenticación API

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
        'address',
    ];

    // Campos que se ocultan en las respuestas JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Definir el tipo de dato para email_verified_at y password
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relación: Un usuario pertenece a un rol
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Relación: Un vendedor tiene muchos productos
    public function products()
    {
        return $this->hasMany(Product::class, 'vendor_id');
    }

    // Relación: Un cliente tiene muchos items en el carrito
    public function cartItems()
    {
        return $this->hasMany(Cart::class);
    }

    // Relación: Un cliente tiene muchos pedidos
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // Helpers para verificar roles
    public function isVendor()
    {
        return $this->role_id === 1;
    }

    // Helper para verificar si el usuario es cliente
    public function isClient()
    {
        return $this->role_id === 2;
    }
}