<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyValueController;
use App\Http\Controllers\CreditProposalController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositoCarouselController;
use App\Http\Controllers\DepositoFaqController;
use App\Http\Controllers\DepositoInfoController;
use App\Http\Controllers\DepositoSliderController;
use App\Http\Controllers\DepositoStepController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\InterestRateController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductFAQController;
use App\Http\Controllers\ProductFeatureController;
use App\Http\Controllers\ProductRequirementController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\TeamProfileController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->middleware(['auth', 'checkPermission'])->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard.index');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('articles', ArticleController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    Route::resource('reports', ReportController::class);
    Route::resource("testimonials", TestimonialController::class);
    Route::resource("interest-rates", InterestRateController::class);
    Route::resource("credit-proposals", CreditProposalController::class);
    Route::resource("team-profiles", TeamProfileController::class);
    Route::resource("company-values", CompanyValueController::class);
    Route::resource("faqs", FaqController::class);
    Route::resource("promos", PromoController::class);
    Route::resource("careers", CareerController::class);
    Route::resource("product-features", ProductFeatureController::class);
    Route::resource("product-requirements", ProductRequirementController::class);
    Route::resource('product-faqs', ProductFAQController::class);
    Route::get("seo", [SeoController::class, 'index'])->name("seo.index");
    Route::post("seo", [SeoController::class, 'update'])->name("seo.update");
    Route::get('/menus', [MenuController::class, 'index'])->name('menus.index');
    Route::get('/menus/{menu}/edit', [MenuController::class, 'edit'])->name('menus.edit');
    Route::put('/menus/{menu}', [MenuController::class, 'update'])->name('menus.update');

    Route::resource('deposito-carousel', DepositoCarouselController::class);
    Route::resource('deposito-step', DepositoStepController::class);
    Route::resource('deposito-faq', DepositoFaqController::class);
    Route::resource('deposito-info', DepositoInfoController::class);
    Route::resource('deposito-slider', DepositoSliderController::class);
});


Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::delete('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

require __DIR__ . '/main.php';
