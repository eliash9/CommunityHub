<?php

namespace Database\Seeders;

use App\Models\Community;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = [
            [
                'name' => 'Komunitas Programmer Indonesia',
                'slug' => 'komunitas-programmer-indonesia',
                'description' => 'Komunitas untuk programmer Indonesia untuk berbagi pengetahuan dan pengalaman.',
                'logo' => 'communities/kpi-logo.png',
                'cover_image' => 'communities/kpi-cover.jpg',
                'primary_color' => '#4A90E2',
                'secondary_color' => '#50E3C2',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id',
                'max_members' => 1000,
                'is_active' => true,
                'database' => 'kpi_' . Str::random(8),
            ],
            [
                'name' => 'Komunitas Desainer UI/UX',
                'slug' => 'komunitas-desainer-ui-ux',
                'description' => 'Komunitas untuk desainer UI/UX Indonesia untuk berbagi karya dan inspirasi.',
                'logo' => 'communities/uiux-logo.png',
                'cover_image' => 'communities/uiux-cover.jpg',
                'primary_color' => '#FF6B6B',
                'secondary_color' => '#FFD166',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id',
                'max_members' => 500,
                'is_active' => true,
                'database' => 'uiux_' . Str::random(8),
            ],
        ];

        foreach ($communities as $community) {
            Community::create($community);
        }
    }
}