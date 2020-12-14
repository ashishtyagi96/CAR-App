<?php


namespace App\Http\Middleware;
use App\Response;
use Closure;
use Illuminate\Support\Facades\Log;


class AuthenticateSdk
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
        $app_key = request()->header('app-key');
        Log::info('app-key',['key'=>$app_key]);
        if($app_key == config('app.secret_key')){
            return $next($request);
        }
        $response = new Response();

        $response->setStatusCode(401, false);
        $response->setMessage("unauthorized access");
        return $response->sendApiResponse();

    }

}
