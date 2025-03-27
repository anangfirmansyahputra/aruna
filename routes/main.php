<?php

use App\Http\Controllers\LocaleController;
use App\Http\Controllers\Main\ArticleController;
use App\Http\Controllers\Main\MainController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Main\ProductController;

Route::get("/lang/{lang}", LocaleController::class);

Route::get("/", [MainController::class, 'index']);
Route::get("/careers", [MainController::class, 'career']);
Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{slug}", [ProductController::class, "show"]);
Route::get("/articles", [ArticleController::class, 'index']);
Route::get("/articles/{slug}", [ArticleController::class, 'show']);
