<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

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

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    protected $appends = [
        'total',
    ];

    public function getTotalAttribute()
    {
        return $this->total_amount;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
