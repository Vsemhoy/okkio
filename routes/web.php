<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

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


Route::get('/logins', [RegisterController::class, 'post_login']);


Route::get('/', function () {
    return view('index');
});



Route::get('/budget', function () {
    return view('public.apps.budget.index');
})->name('budget');



Route::prefix('eventor')->group(function () {
    Route::get('/', function () {
        return view('public.apps.eventor.index');
    })->name('eventor');
  
    Route::post('/postcall', [EventorHttpController::class, 'postcall']);
  });