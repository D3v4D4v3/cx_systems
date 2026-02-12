<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Periféricos', 'description' => 'Mouse, teclados, audífonos gaming'],
            ['name' => 'Componentes PC', 'description' => 'RAM, procesadores, tarjetas gráficas'],
            ['name' => 'Monitores', 'description' => 'Monitores gaming de alta frecuencia'],
            ['name' => 'Laptops Gaming', 'description' => 'Laptops especializadas para gaming'],
            ['name' => 'Sillas Gaming', 'description' => 'Sillas ergonómicas para gamers'],
            ['name' => 'Accesorios', 'description' => 'Mousepads, cables, RGB y más'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                ['description' => $category['description']]
            );
        }
    }
}