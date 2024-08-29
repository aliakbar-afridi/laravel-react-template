<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class
        ]);

        \App\Models\Profile::factory(100)->create();

        // create an admin user, and assign school 1
        $admin = User::factory()->create([
            'name' => "Admin",
            'email' => "admin@admin.com",
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // admin user profile
        \App\Models\Profile::factory(1)->create(
            [
                'user_id' => $admin->id,
                'gender' => "male",
                'skills' => json_encode(["admin"])
            ]
        );

        $admin->assignRole(['super admin']);
    }
}
