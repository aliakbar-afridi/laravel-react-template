<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::firstOrCreate([
            'name' => 'super admin',
            'guard_name' => 'sanctum',
        ]);
        Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'sanctum',
        ]);
        Role::firstOrCreate([
            'guard_name' => 'sanctum',
            'name' => 'watcher',
        ]);
    }
}
