<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Undangan', 'Flash Card', 'Mahkota', 'Stiker', 'Kipas', 'Souvenir', 'Dekorasi', 'Lainnya'];
        
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->numberBetween(10000, 500000),
            'image_path' => 'products/sample-product.jpg', // placeholder image
            'category' => $this->faker->randomElement($categories),
            'whatsapp_number' => '6285397131071',
            'whatsapp_message' => 'Halo Akayacraft, saya tertarik dengan produk ' . $this->faker->words(2, true) . '. Bisakah saya mendapatkan informasi lebih lanjut?',
            'is_active' => $this->faker->boolean(90), // 90% chance to be active
        ];
    }
}
