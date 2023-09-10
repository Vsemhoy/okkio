<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;

class UserAuthCheck
{
    public function handle(Request $request, Closure $next)
    {
        $checked = auth()->check();
        if (!$checked) {
            return redirect('/')->with('fail', 'You must be logged in'); // Перенаправление для зарегистрированных пользователей
        }
    
        return $next($request); // Пользователи без аутентификации имеют доступ к странице

        // if (!session()->has('LoggedUser') && !in_array($request->path(), ['/', '/logins'])) {
        //     return redirect('/')->with('fail', 'You must be logged in');
        // }

        // if (!session()->has('LoggedUser') && $request->path() == 'admin/check') {
        //     $AC = new UserAuthCheck;
        //     return $AC->check($request);
        // }

        return $next($request)->header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', 'Sat 01 Jan 1990 00:00:00 GMT');
    }
}

// class UserAuthCheck
// {

//   public function handle(Request $request, Closure $next)
//   {
//     if (!session()->has('LoggedUser') && ($request->path() != '/'
//      && $request->path() != '/logins'
//      )){
//       return redirect('/')->with('fail', 'You must be logged in');
//      }

//      if (!session()->has('LoggedUser') && $request->path() == 'admin/check'
//      ){
//         $AC = new UserAuthCheck;
//             return $AC->check($request);
//      }

//      if (session()->has('LoggedUser') && ($request->path() == 'facade' ||
//      $request->path() == '/logins')){
//       return back();
//      }



//      return $next($request)->header('Cache-Control','no-cache, no-store, max-age=0, must-revalidate')
//      ->header('Pragma','no-cache')
//      ->header('Expires','Sat 01 Jan 1990 00:00:00 GMT');
//   }
// }