<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roleNames): Response
    {
        foreach ($roleNames as $roleName) {
            if ($request->user()->hasRole($roleName)) {
                return $next($request);
            }
        }

        return abort(403);
    }
}
