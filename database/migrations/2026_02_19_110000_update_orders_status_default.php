<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('status')->default('pendiente')->change();
            $table->string('payment_method')->nullable()->after('status');
            $table->string('payment_id')->nullable()->after('payment_method');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('status')->default('paid')->change();
            $table->dropColumn(['payment_method', 'payment_id']);
        });
    }
};
