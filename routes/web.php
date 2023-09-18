<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Apps\Eventor\EventorHttpController;
use App\Http\Middleware\UserAuthCheck;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::post('/login', [RegisterController::class, 'post_login']);
Route::post('/register', [RegisterController::class, 'post_registration']);
Route::post('/logout', [RegisterController::class, 'post_logout']);
Route::post('/getusername/{uid}', [RegisterController::class, 'getUserOnlyName']);

Route::get('/logins', [RegisterController::class, 'get_login']);


Route::get('/', function () {
    return view('entrance');
})->name('entrance');

Route::get('/entrance', function () {
    return view('entrance');
});

Route::group(['middleware' => ['App\Http\Middleware\UserAuthCheck']], function () {

    Route::get('/index', function () {
        return view('public.index');
    })->name('index');

    Route::get('/budget', function () {
        return view('public.apps.budget.index');
    })->name('budget');

    // Route::get('/calendar', function () {
    //     return view('public.apps.calendar_api.index');
    // })->name('calendar');

    Route::prefix('eventor')->group(function () {
        Route::get('/', function () {
            return view('public.apps.eventor.index');
        })->name('eventor');
    
        Route::post('/postcall', [EventorHttpController::class, 'postcall']);
  });

});