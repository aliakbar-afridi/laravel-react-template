<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $request->user();
        $user->fill([
            "email" => $data['email'],
            "name" => $data['name'],
        ]);

        $profile = Profile::where('user_id', $user->id)->first();
        $profile->education = $data['education'];
        $profile->state = $data['state'];
        $profile->city = $data['city'];
        $profile->phone = $data['phone'];
        $profile->skills = $data['skills'];
        $profile->about = $data['about'];
        $profile->parent = $data['parent'];
        $profile->gender = $data['gender'];

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $profile->save();
        $user->save();

        return new JsonResponse([
            "message" => "Profile updated",
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
