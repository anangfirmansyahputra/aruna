<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Main\ProductController;

Route::get("/products", [ProductController::class, "index"]);
