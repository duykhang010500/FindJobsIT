<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class SetSanctumGuard
{
    public function handle($request, Closure $next)
    {
        if (Str::startsWith($request->getRequestUri(), '/api/admin/')) {
            config(['sanctum.guard' => 'admin']);
        } elseif (Str::startsWith($request->getRequestUri(), '/api/employer/')) {
            config(['sanctum.guard' => 'employer']);
        } elseif (Str::startsWith($request->getRequestUri(), '/api/member/')) {
            config(['sanctum.guard' => 'member']);
        }

        return $next($request);
    }
}