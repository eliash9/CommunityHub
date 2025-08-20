<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'users/admin-avatar.png',
                'phone' => '+6281234567890',
                'bio' => 'Administrator aplikasi',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id',
            ],
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'users/john-avatar.png',
                'phone' => '+6281234567891',
                'bio' => 'Software Developer',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
                'avatar' => 'users/jane-avatar.png',
                'phone' => '+6281234567892',
                'bio' => 'UI/UX Designer',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}