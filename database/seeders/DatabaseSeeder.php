<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        Product::create(['name' => 'Laravel T-Shirt', 'price' => 25.00, 'stock_quantity' => 50]);
        Product::create(['name' => 'Inertia Mug', 'price' => 12.50, 'stock_quantity' => 12]);
        Product::create(['name' => 'React Cap', 'price' => 15.00, 'stock_quantity' => 5]);
    
    }
}