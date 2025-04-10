<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promos = Promo::latest()->get();
        return Inertia::render("promo/page", [
            'data' => $promos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('translations')->get();
        return Inertia::render("promo/form", [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => "required|integer|exists:products,id",
            "coupon" => "string|required|unique:promos,coupon",
            "id_content" => "required|string",
            "en_content" => "required|string",
            "id_description" => "required|string",
            "en_description" => "required|string",
            "id_title" => "required|string",
            "en_title" => "required|string",
            'image_url' => 'mimes:jpeg,jpg,png,gif|max:1000',
        ]);

        if ($request->hasFile("image_url")) {
            $data['image_url'] = $request->file("image_url")->store("promo", "public");
        }

        $dates = explode(',', $request->date);
        $startDateRaw = implode(',', array_slice($dates, 0, 2)); // "Fri, 25 Apr 2025 16:00:00 GMT"
        $endDateRaw = implode(',', array_slice($dates, 2));      // "Tue, 29 Apr 2025 16:00:00 GMT"
        $data["start_date"] = Carbon::parse($startDateRaw)->toDateString(); // 2025-04-25
        $data["end_date"] = Carbon::parse($endDateRaw)->toDateString();

        Promo::create($data);
        return redirect()->route("promos.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Promo $promo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promo $promo)
    {
        $products = Product::with('translations')->get();
        return Inertia::render("promo/form", [
            'data' => $promo,
            'products' => $products
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promo $promo)
    {
        $data = $request->validate([
            'product_id' => "required|integer|exists:products,id",
            "coupon" => "string|required|unique:promos,coupon," . $promo->id,
            "id_content" => "required|string",
            "en_content" => "required|string",
            "id_description" => "required|string",
            "en_description" => "required|string",
            "id_title" => "required|string",
            "en_title" => "required|string",
            "start_date" => "required|string",
            "end_date" => "required|string"
        ]);

        if ($request->hasFile("image_url")) {
            $request->file("image_url")->store("promo", "public");
        } else {
            unset($data["image_url"]);
        }

        dd($data);

        $promo->update($data);
        return redirect()->route("promos.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promo $promo)
    {
        $promo->delete();
        return redirect()->route("promos.index");
    }
}
