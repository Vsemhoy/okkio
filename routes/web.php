<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
});

Route::get('/eventor', function () {
    return view('public.apps.eventor.index');
})->name('eventor');

Route::get('/budget', function () {
    return view('public.apps.budget.index');
})->name('budget');