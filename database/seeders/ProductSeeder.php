<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $vendor = User::where('role_id', 1)->first();
        
        if (!$vendor) {
            $this->command->warn('No se encontró un usuario vendedor. Ejecuta UserSeeder primero.');
            return;
        }

        $products = [
            // PERIFÉRICOS
            [
                'name' => 'Logitech G Pro X Superlight',
                'description' => 'Mouse gaming inalámbrico ultra ligero de 63g. Sensor HERO 25K, 25,600 DPI. Batería de hasta 70 horas. Diseño ambidiestro profesional.',
                'price' => 2899.99,
                'stock' => 35,
                'category_id' => 1,
            ],
            [
                'name' => 'Razer BlackWidow V4 Pro',
                'description' => 'Teclado mecánico gaming con switches Green. RGB Chroma, reposamuñecas magnético, rueda de comandos y 8 teclas macro programables.',
                'price' => 4299.99,
                'stock' => 20,
                'category_id' => 1,
            ],
            [
                'name' => 'HyperX Cloud Alpha Wireless',
                'description' => 'Audífonos gaming inalámbricos con batería de 300 horas. Audio espacial DTS, micrófono con cancelación de ruido. Comodidad suprema.',
                'price' => 3499.99,
                'stock' => 28,
                'category_id' => 1,
            ],
            [
                'name' => 'SteelSeries Apex Pro TKL',
                'description' => 'Teclado mecánico TKL con switches ajustables OmniPoint 2.0. Actuation de 0.2mm a 3.8mm. OLED Smart Display integrado.',
                'price' => 3899.99,
                'stock' => 15,
                'category_id' => 1,
            ],

            // COMPONENTES PC
            [
                'name' => 'Corsair Vengeance RGB 32GB (2x16GB) DDR5',
                'description' => 'RAM DDR5 6000MHz CL30. Iluminación RGB dinámica. Disipador de calor de aluminio. Compatible con Intel XMP 3.0 y AMD EXPO.',
                'price' => 2599.99,
                'stock' => 50,
                'category_id' => 2,
            ],
            [
                'name' => 'G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5',
                'description' => 'RAM DDR5 6400MHz CL32. Iluminación RGB programable. Perfil XMP 3.0. Ideal para gaming extremo y workstations.',
                'price' => 4999.99,
                'stock' => 25,
                'category_id' => 2,
            ],
            [
                'name' => 'NVIDIA GeForce RTX 4080 SUPER',
                'description' => 'Tarjeta gráfica con 16GB GDDR6X. Ray Tracing de 3ra gen, DLSS 3.5. Perfecta para 4K gaming a más de 100 FPS.',
                'price' => 24999.99,
                'stock' => 12,
                'category_id' => 2,
            ],
            [
                'name' => 'AMD Ryzen 9 7950X3D',
                'description' => 'Procesador 16 núcleos / 32 threads. 5.7GHz boost. Tecnología 3D V-Cache de 128MB. El mejor CPU para gaming y productividad.',
                'price' => 12999.99,
                'stock' => 18,
                'category_id' => 2,
            ],

            // MONITORES
            [
                'name' => 'ASUS ROG Swift PG27AQDM',
                'description' => 'Monitor OLED 27" QHD 240Hz. Tiempo de respuesta 0.03ms. G-SYNC Compatible. HDR True Black 400. Perfecto para esports.',
                'price' => 18999.99,
                'stock' => 10,
                'category_id' => 3,
            ],
            [
                'name' => 'Samsung Odyssey G9 49"',
                'description' => 'Monitor curvo ultra-wide 49" DQHD 240Hz. Relación 32:9, 1000R de curvatura. HDR 1000, Quantum Dot. Experiencia inmersiva total.',
                'price' => 26999.99,
                'stock' => 6,
                'category_id' => 3,
            ],
            [
                'name' => 'LG UltraGear 27GP950-B',
                'description' => 'Monitor 27" 4K UHD 144Hz. Nano IPS, HDR 600, compatibilidad NVIDIA G-SYNC y AMD FreeSync. Cobertura DCI-P3 98%.',
                'price' => 14999.99,
                'stock' => 14,
                'category_id' => 3,
            ],
            [
                'name' => 'BenQ ZOWIE XL2566K',
                'description' => 'Monitor esports 24.5" Full HD 360Hz. DyAc⁺ technology para claridad extrema. Panel TN de 0.5ms. Diseñado para profesionales.',
                'price' => 11999.99,
                'stock' => 22,
                'category_id' => 3,
            ],

            // LAPTOPS GAMING
            [
                'name' => 'ASUS ROG Zephyrus G16',
                'description' => 'Laptop gaming 16" QHD+ 240Hz. Intel Core i9-14900HS, RTX 4080, 32GB RAM, 1TB SSD. Ultra delgada y potente.',
                'price' => 49999.99,
                'stock' => 8,
                'category_id' => 4,
            ],
            [
                'name' => 'Razer Blade 15',
                'description' => 'Laptop 15.6" QHD 240Hz. Intel i9-13950HX, RTX 4070, 32GB DDR5, 1TB SSD. Diseño premium en aluminio CNC.',
                'price' => 44999.99,
                'stock' => 5,
                'category_id' => 4,
            ],
            [
                'name' => 'MSI Titan 18 HX',
                'description' => 'Laptop extrema 18" 4K 120Hz Mini LED. Intel i9-14900HX, RTX 4090, 128GB RAM, 4TB SSD. Refrigeración Cooler Boost 5.',
                'price' => 89999.99,
                'stock' => 3,
                'category_id' => 4,
            ],

            // SILLAS GAMING
            [
                'name' => 'Secretlab Titan Evo 2024',
                'description' => 'Silla gaming premium con espuma híbrida NEO. Respaldo reclinable 85-165°. Cuero PU Prime 2.0. Soporte lumbar magnético.',
                'price' => 9999.99,
                'stock' => 30,
                'category_id' => 5,
            ],
            [
                'name' => 'Herman Miller X Logitech Embody',
                'description' => 'Silla ergonómica gaming diseñada con ciencia. Soporte de espalda pixelado, ajustes infinitos. La mejor para sesiones largas.',
                'price' => 34999.99,
                'stock' => 7,
                'category_id' => 5,
            ],
            [
                'name' => 'Razer Iskur V2',
                'description' => 'Silla gaming con soporte lumbar externo ajustable. Cuero sintético multicapa, reposabrazos 4D. Certificación ergonómica.',
                'price' => 11999.99,
                'stock' => 20,
                'category_id' => 5,
            ],

            // ACCESORIOS
            [
                'name' => 'SteelSeries QcK Heavy XXL',
                'description' => 'Mousepad gaming XXL 900x400mm. Base de goma antideslizante. Superficie de tela optimizada para sensores ópticos.',
                'price' => 699.99,
                'stock' => 60,
                'category_id' => 6,
            ],
            [
                'name' => 'Elgato Stream Deck MK.2',
                'description' => 'Controlador de streaming con 15 teclas LCD personalizables. Integración con OBS, Twitch, Discord. Intercambiable.',
                'price' => 3299.99,
                'stock' => 25,
                'category_id' => 6,
            ],
            [
                'name' => 'Nanoleaf Lines Starter Kit',
                'description' => 'Kit de iluminación RGB modular. 9 barras LED inteligentes. Sincronización con música y juegos. Control por app.',
                'price' => 4599.99,
                'stock' => 18,
                'category_id' => 6,
            ],
            [
                'name' => 'Blue Yeti X',
                'description' => 'Micrófono USB profesional con 4 cápsulas condensadoras. Medidor LED de alta resolución. Ideal para streaming y gaming.',
                'price' => 3799.99,
                'stock' => 32,
                'category_id' => 6,
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['name' => $product['name']],
                array_merge($product, ['vendor_id' => $vendor->id])
            );
        }
    }
}