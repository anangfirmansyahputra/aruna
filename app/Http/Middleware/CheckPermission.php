<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user) {
            session()->flash('error', 'You do not have permission to access this page.');
            return redirect()->route('dashboard');
        }

        $routeName = $request->route()->getName();

        if (!$routeName) {
            session()->flash('error', 'Invalid route name.');
            return redirect()->route('dashboard');
        }

        if (!$user->hasPermissionTo($routeName)) {
            session()->flash('error', 'You are not authorized to view this page.');

            $firstAccessiblePermission = $user->getAllPermissions()->first();
            $firstRoute = $firstAccessiblePermission ? $firstAccessiblePermission->name : 'dashboard';

            return redirect()->route($firstRoute);
        }

        return $next($request);
    }
}
