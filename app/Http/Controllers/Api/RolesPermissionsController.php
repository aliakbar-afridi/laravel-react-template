<?php

namespace App\Http\Controllers\Api;

use App\Console\Commands\GeneratePermissions;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesPermissionsController extends Controller
{
    /**
     * Display a listing of the roles.
     */
    public function index(): JsonResponse
    {
        $roles = Role::with(['permissions'])->whereNot('name', "super admin")->get();
        return response()->json([
            "roles" => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): JsonResponse
    {
        $permissions = Permission::whereNotIn("name", [...GeneratePermissions::$excludedRoutes, ...GeneratePermissions::$defaultRoutes, ...GeneratePermissions::$superAdminRoutes])->get();
        return response()->json([
            "permissions" => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'role' => ['required', 'string', 'unique:roles,name'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', 'exists:permissions,id'],
        ]);

        $role = Role::create([
            'name' => $validatedData['role'],
            'guard_name' => 'sanctum',
        ]);

        $role->givePermissionTo($validatedData["permissions"]);
        // give default permissions
        $role->givePermissionTo(GeneratePermissions::$defaultRoutes);

        return response()->json([
            "message" => "Role created successfully",
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): JsonResponse
    {
        $role = Role::findOrFail($id);

        $permissions = Permission::whereNotIn(
            "name",
            [
                ...GeneratePermissions::$excludedRoutes,
                ...GeneratePermissions::$superAdminRoutes
            ]
        )->get();

        return response()->json([
            "role" => $role,
            "permissions" => $permissions,
            "assignedPermissions" => $role->permissions->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        $validatedData = $request->validate([
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', 'exists:permissions,id'],
        ]);

        $role->syncPermissions($validatedData["permissions"]);
        // give default permissions
        $role->givePermissionTo(GeneratePermissions::$defaultRoutes);

        return response()->json([
            "message" => "Role " . $role->name . " updated successfully",
            "role" => $role,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $role = Role::findOrFail($id);

        // don't allow user to delete super admin role
        if ($role->name == "super admin") {
            return response()->json([
                "message" => "Unauthorized access. Cannot delete super admin role.",
                "type" => "error",
            ], 403);
        }

        // $role->delete();  // not working! why??
        Role::where('id', $id)->delete();

        return response()->json([
            "message" => "Role deleted successfully",
        ]);
    }
}
