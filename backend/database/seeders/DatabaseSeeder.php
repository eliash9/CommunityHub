<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed landlord database
        $this->call([
            CommunitySeeder::class,
        ]);
        
        // Seed tenant database
        $this->call([
            UserSeeder::class,
            MemberSeeder::class,
        ]);
    }
}
