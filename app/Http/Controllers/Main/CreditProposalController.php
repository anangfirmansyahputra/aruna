<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CreditProposalController extends Controller
{
    public function index()
    {
        $lang = strtoupper(Session::get("lang", "id"));

        $creditProducts = Product::where("is_credit", true)->translation($lang)->get();

        return Inertia::render("main/credit/form", [
            'credit_products' => $creditProducts
        ]);
    }
}
