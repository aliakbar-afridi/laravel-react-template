<?php

namespace App\Http\Middleware;

use App\Console\Commands\GeneratePermissions;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Route;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the route name
        $routeName = Route::currentRouteName();

        // Check if route name exists and if the user is authenticated
        if ($routeName && Auth::check()) {
            $user = Auth::user();

            // if($user->status != 1){
            //     return redirect('/inactive');
            // }

            // Check if the user has permission for the route
            if (!in_array($routeName, GeneratePermissions::$excludedRoutes) && !$user->can($routeName)) {
                // Abort with a 403 Forbidden response if permission is denied
                abort(403, 'Unauthorized access.');
            }
        }

        return $next($request);
    }
}
