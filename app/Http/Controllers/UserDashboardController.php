<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return Inertia::render('Admin/Dashboard');
        } else if ($user->hasRole('student')) {
            return redirect()->route('enrollments.index');
        } else if ($user->hasRole('teacher')) {
            return Inertia::render('Teachers/Dashboard');
        }

        return abort(403);
    }
}
