<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'shipping_address',
        'phone',
        'notes',
        'payment_method',
        'payment_id',
    ];

    // Definir el tipo de dato para total_amount
    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    // Agregar un atributo total para facilitar el acceso al total_amount
    protected $appends = [
        'total',
    ];

    // Accesor para el atributo total
    public function getTotalAttribute()
    {
        return $this->total_amount;
    }

    // Relación: Un pedido pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación: Un pedido tiene muchos items
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
