<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Return a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::with(['roles:name'])->when($request->search, function ($query, $search) {
            $query->where("name", "like", "%" . $search . "%");
        })->paginate(config('constants.pagination_limit'))->withQueryString();

        return response()->json([
            "users" => UserResource::collection($users)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('profile')->findOrFail($id);
        return response()->json([
            "user" => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // don't allow user to delete super admin role
        if ($user->hasAnyRole(['super admin'])) {
            abort(403, 'Unauthorized access.');
        }

        $user->delete();

        return new JsonResponse([
            "message" => "User deleted successfully",
        ]);
    }

}
