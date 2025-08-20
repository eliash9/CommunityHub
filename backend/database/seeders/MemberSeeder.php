<?php

namespace Database\Seeders;

use App\Models\Community;
use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = Community::all();
        $users = User::all();

        foreach ($communities as $community) {
            // Make the community current to use the tenant connection
            $community->makeCurrent();

            // Add all users as members to each community
            foreach ($users as $index => $user) {
                $role = $index === 0 ? 'admin' : 'member';
                
                Member::create([
                    'user_id' => $user->id,
                    'community_id' => $community->id,
                    'role' => $role,
                    'status' => 'active',
                    'joined_at' => now(),
                    'notes' => $role === 'admin' ? 'Community administrator' : 'Regular member',
                ]);
            }

            // Forget the current tenant
            $community->forgetCurrent();
        }
    }
}