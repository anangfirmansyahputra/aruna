<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    public function index()
    {
        $promos = Promo::latest()->get();
        return Inertia::render('main/promo/page', [
            'promos' => $promos
        ]);
    }

    public function show(Request $request, string $id)
    {
        $promo = Promo::findOrFail($id);
        return Inertia::render("main/promo/detail", [
            'promo' => $promo
        ]);
    }
}
