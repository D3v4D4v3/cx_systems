<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

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

    public function cartItems()
    {
        return $this->hasMany(Cart::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // Helpers para verificar roles
    public function isVendor()
    {
        return $this->role_id === 1;
    }

    public function isClient()
    {
        return $this->role_id === 2;
    }
}