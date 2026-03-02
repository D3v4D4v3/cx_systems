<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

    // Relación: Un item del carrito pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación: Un item del carrito pertenece a un producto
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
