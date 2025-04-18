<?php

use App\Http\Controllers\LocaleController;
use App\Http\Controllers\Main\ArticleController;
use App\Http\Controllers\Main\CareerController;
use App\Http\Controllers\Main\DepositoController;
use App\Http\Controllers\Main\MainController;
use App\Http\Controllers\PromoRequestController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Main\ProductController;
use App\Http\Controllers\Main\PromoController;

Route::get("/lang/{lang}", LocaleController::class);

Route::get("/", [MainController::class, 'index']);
Route::get("/careers", [CareerController::class, 'index']);
Route::get("/careers/all", [CareerController::class, 'all']);
Route::get('/careers/form', [CareerController::class, 'form']);
Route::post('/careers/form', [CareerController::class, 'store']);
Route::get("/products", [ProductController::class, "index"]);
Route::get("/products/{slug}", [ProductController::class, "show"]);
Route::get("/articles", [ArticleController::class, 'index']);
Route::get("/articles/{slug}", [ArticleController::class, 'show']);
Route::get("/about", [MainController::class, 'about']);
Route::get("/contact", [MainController::class, 'contact']);
Route::get("/faq", [MainController::class, 'faq']);
Route::get("/credit", [MainController::class, 'credit']);
Route::post("/credit", [MainController::class, 'creditStore']);
Route::get("/promo", [PromoController::class, 'index']);
Route::get("/promo/{slug}", [PromoController::class, 'show']);
Route::post("/promo-requests", [PromoRequestController::class, "store"]);

Route::post("/contact", [MainController::class, 'sendMailContact']);

Route::get("/e-deposito", [DepositoController::class, 'index']);
Route::get("/e-deposito/form", [DepositoController::class, 'form']);
