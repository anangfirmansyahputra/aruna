<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard.index')->middleware('permission');

    Route::resource('categories', CategoryController::class)->middleware('permission');
    Route::resource('products', ProductController::class)->middleware('permission');
    Route::resource('news', NewsController::class)->middleware('permission');
    Route::resource('roles', RoleController::class)->middleware('permission');
    Route::resource('users', UserController::class)->middleware('permission');

    Route::get('/menus', [MenuController::class, 'index'])->name('menus.index')->middleware('permission');
    Route::get('/menus/{menu}/edit', [MenuController::class, 'edit'])->name('menus.edit')->middleware('permission');
    Route::put('/menus/{menu}', [MenuController::class, 'update'])->name('menus.update')->middleware('permission');
});


Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::delete('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');
