<?php

use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RolesPermissionsController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Resources\AuthUserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->name("profile.")->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    Route::post('/read-notifications', [ProfileController::class, 'readNotifications'])->name('mark_read.notifications');
});

Route::middleware(['auth:sanctum', 'verified', 'check.permission'])->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => new AuthUserResource($request->user())
        ]);
    });
    Route::prefix('/users')->name("users.")->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('index');
        Route::get('/{id}', [UsersController::class, 'show'])->name('show');
        Route::post('/delete/{id}', [UsersController::class, 'destroy'])->name('delete');
        Route::post('/change-status', [UsersController::class, 'changeStatus'])->name('status');
    });
    Route::prefix('/roles')->name("roles.")->group(function () {
        Route::get('/', [RolesPermissionsController::class, 'index'])->name('index');
        Route::get('/create', [RolesPermissionsController::class, 'create'])->name('create');
        Route::get('/edit/{id}', [RolesPermissionsController::class, 'edit'])->name('edit');
        Route::post('/store', [RolesPermissionsController::class, 'store'])->name('store');
        Route::post('/update/{id}', [RolesPermissionsController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [RolesPermissionsController::class, 'destroy'])->name('delete');

        Route::get('/assign/{id}', [RolesPermissionsController::class, 'showAssign'])->name('show.assign');
        Route::post('/assign', [RolesPermissionsController::class, 'assign'])->name('assign');
    });

});

require __DIR__ . '/auth.php';
