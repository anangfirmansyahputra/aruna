<?php

use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Main\ProductController;

Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{slug}", [ProductController::class, "show"]);
Route::get("/lang/{lang}", LocaleController::class);
