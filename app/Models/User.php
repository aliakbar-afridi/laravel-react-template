<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Helpers\CacheHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    protected $guard_name = ['sanctum'];

    public function getAllPermissionsAsArray()
    {
        return CacheHelper::getCache("Permissions" . $this->id, function () {
            // Ensure we're only working with sanctum-guarded roles and permissions
            $this->load([
                'roles' => function ($query) {
                    $query->where('guard_name', 'sanctum');
                },
                'roles.permissions' => function ($query) {
                    $query->where('guard_name', 'sanctum');
                }
            ]);

            $permissions = $this->roles->flatMap(function ($role) {
                return $role->permissions->pluck('name');
            })->unique()->values()->all();

            return $permissions;
        });
    }
}
