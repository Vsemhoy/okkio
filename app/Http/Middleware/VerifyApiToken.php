<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class VerifyApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Check if the request has an 'Authorization' header with the 'Bearer' scheme
        if ($request->hasHeader('Authorization')) {
            $headerValue = $request->header('Authorization');
            $token = str_replace('Bearer ', '', $headerValue);

            // Look up the user by the hashed token value in the 'api_token' column
            $user = Auth::getProvider()->retrieveByCredentials(['api_token' => hash('sha256', $token)]);

            // If the user is found, set it as the currently authenticated user
            if ($user) {
                $request->merge(['user' => $user]);
                Auth::setUser($user);
            }
        }

        return $next($request);
    }
}