<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario vendedor admin
        User::firstOrCreate(
            ['email' => 'admin@cxsystems.com'],
            [
                'name' => 'Admin Vendedor',
                'password' => Hash::make('password'),
                'role_id' => 1,
                'phone' => '9999999999',
                'address' => 'Campeche, México',
            ]
        );

        // Usuario cliente de prueba
        User::firstOrCreate(
            ['email' => 'cliente@test.com'],
            [
                'name' => 'Cliente Test',
                'password' => Hash::make('password'),
                'role_id' => 2,
                'phone' => '9999999998',
                'address' => 'Campeche, México',
            ]
        );
    }
}