<?php

namespace App\Http\Controllers;

use App\Models\PromoRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promoRequest = PromoRequest::with('promo')->latest()->get();
        return Inertia::render("promo-request/page", [
            'data' => $promoRequest
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('promo-request/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validate($request);

        PromoRequest::create($data);
        // return redirect()->route("promo-requests.index");
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(PromoRequest $promoRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PromoRequest $promoRequest)
    {
        return Inertia::render('promo-request/form', [
            'data' => $promoRequest
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PromoRequest $promoRequest)
    {
        $data = $this->validate($request);
        PromoRequest::update($data, $promoRequest->id);
        return redirect()->route('promo-requests.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromoRequest $promoRequest)
    {
        $promoRequest->delete();
        return redirect()->route('promo-requests.index');
    }

    public function validate(Request $request)
    {
        return $request->validate([
            "name" => ["required", "string"],
            "promo_id" => ["required", "integer"],
            "no_hp" => ["required", "string"],
            "email" => ["required", "string"],
            "address" => ["required", "string"]
        ]);
    }
}
