<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
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

    public function show(Request $request, string $slug)
    {
        $locale = Session::get("locale", "id");
        $promo = Promo::where('id_slug', $slug)->orWhere("en_slug", $slug)->first();

        if (!$promo) {
            return abort(404);
        }

        $localizedSlug = $locale === 'id' ? $promo->id_slug : $promo->en_slug;

        if ($slug !== $localizedSlug) {
            return redirect("/promo/" . $localizedSlug);
        }

        return Inertia::render("main/promo/detail", [
            'promo' => $promo
        ]);
    }
}
