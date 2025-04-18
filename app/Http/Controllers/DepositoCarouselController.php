<?php

namespace App\Http\Controllers;

use App\Models\DepositoCarousel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DepositoCarouselController extends Controller
{
    public function index()
    {
        return Inertia::render("deposito/carousel/page", [
            'data' => DepositoCarousel::all()
        ]);
    }

    public function create()
    {
        return Inertia::render("deposito/carousel/form");
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
            "image_url" => "required|mimes:jpeg,jpg,png,gif,svg|max:2048"
        ]);

        if ($request->hasFile("image_url")) {
            $validate["image_url"] = $request->file("image_url")->store('deposito_carousel', 'public');
        }

        DepositoCarousel::create($validate);

        return to_route("deposito-carousel.index");
    }

    public function show(string $id)
    {
        //
    }

    public function edit(DepositoCarousel $depositoCarousel)
    {
        return Inertia::render("deposito/carousel/form", [
            'data' => $depositoCarousel
        ]);
    }

    public function update(Request $request, DepositoCarousel $depositoCarousel)
    {
        $validate = $request->validate([
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
            'image_url' => [
                'nullable',
                Rule::when(
                    $request->hasFile('image_url'),
                    ['image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
                    ['string', 'url']
                )
            ],
        ]);

        if ($request->hasFile('image_url')) {
            $validate['image_url'] = $request->file('image_url')->store('products', 'public');
        } else {
            unset($validate['image_url']);
        }

        $depositoCarousel->update($validate);

        return to_route("deposito-carousel.index");
    }

    public function destroy(DepositoCarousel $depositoCarousel)
    {
        $depositoCarousel->delete();

        return to_route("deposito-carousel.index");
    }
}
