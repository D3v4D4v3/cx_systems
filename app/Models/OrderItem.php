<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price',
        'subtotal',
    ];

    // Definir el tipo de dato para unit_price y subtotal
    protected $casts = [
        'unit_price' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    // Relación: Un item pertenece a un pedido
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relación: Un item pertenece a un producto
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
