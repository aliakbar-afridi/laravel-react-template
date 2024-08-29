<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create an admin user, and assign school 1
        $admin = User::factory()->create([
            'name' => "Admin",
            'email' => "admin@admin.com",
            'school_id' => 1,
            'email_verified_at' => now(),
            'type' => "SA",
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

        $this->call([
            RoleSeeder::class
        ]);
    }
}
