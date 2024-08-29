<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class GeneratePermissions extends Command
{
    protected $signature = 'permissions:generate';
    protected $description = 'Generate permissions based on routes names';

    // Define the public routes names to exclude
    public static $excludedRoutes = [
        'profile.edit',
        'profile.update',
        'profile.destroy',
        'profile.mark_read.notifications',
        'inactive',
        'register',
        'login',
        'sanctum.login',
        'sanctum.register',
        'logout',
        'password.request',
        'password.email',
        'password.store',
        'password.reset',
        'password.confirm',
        'password.update',
        'verification.notice',
        'verification.verify',
        'verification.send',
        'sanctum.csrf-cookie',
        'ignition.healthCheck',
        'ignition.executeSolution',
        'ignition.updateConfig',
        'debugbar.openhandler',
        'debugbar.clockwork',
        'debugbar.assets.css',
        'debugbar.assets.js',
        'debugbar.cache.delete',
    ];

    // Define default permissions
    public static $defaultRoutes = [
        'dashboard',
    ];

    public static $superAdminRoutes = [
        'roles.create',
        'roles.edit',
        'roles.delete',
    ];

    public function handle()
    {
        // Fetch all routes
        $routes = Route::getRoutes();

        // Collect new permissions
        $newPermissions = [];

        foreach ($routes as $route) {
            // Check if route name exists and is not excluded
            $routeName = $route->getName();
            if ($routeName && !in_array($routeName, self::$excludedRoutes)) {
                // Add the permission to the list
                $newPermissions[] = $routeName;
            }
        }

        // Combine new permissions with default permissions
        $allPermissions = array_merge($newPermissions, self::$defaultRoutes);
        $allPermissions = array_merge($allPermissions, self::$superAdminRoutes);

        // Get existing permissions
        $existingPermissions = Permission::whereIn('name', $allPermissions)->pluck('name')->toArray();

        // Determine new permissions to insert
        $permissionsToCreate = array_diff($allPermissions, $existingPermissions);

        // Insert new permissions in batch
        if (!empty($permissionsToCreate)) {
            foreach ($permissionsToCreate as $per) {
                Permission::updateOrCreate(
                    ['name' => $per, 'guard_name' => 'sanctum']
                );
            }
            $this->info(count($permissionsToCreate) . ' new permissions created.');
        } else {
            $this->info('No new permissions to create.');
        }

        // common user role and assign public and default permission
        $watcherRole = Role::firstOrCreate(['name' => 'watcher', 'guard_name' => 'sanctum']);
        $watcherRole->syncPermissions(Permission::whereIn('name', self::$defaultRoutes)->get());
        $this->info('Default permissions assigned to the "watcher" role.');


        // Fetch or create the 'super admin' role
        $role = Role::firstOrCreate(['name' => 'super admin', 'guard_name' => 'sanctum']);

        // Assign all permissions to the 'super admin' role
        $role->syncPermissions(Permission::all());

        $this->info('All permissions assigned to the "super admin" role.');
    }
}
