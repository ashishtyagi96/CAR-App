<?php

namespace App\Http\Middleware;

use App\Auth\Auth;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InstantiateWebAuth
{

    public function __construct()
    {
    }

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $access_token = $request->cookie(Auth::ACCESS_TOKEN_WEB_COOKIE_NAME);
        Auth::initialize($access_token);
        return $next($request);
    }
}
