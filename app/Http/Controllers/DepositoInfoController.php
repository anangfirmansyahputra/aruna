<?php

namespace App\Http\Controllers;

use App\Models\DepositoInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepositoInfoController extends Controller
{
    public function index()
    {
        return Inertia::render("deposito/info/page", [
            'data' => DepositoInfo::all()
        ]);
    }

    public function create()
    {
        return Inertia::render("deposito/info/form");
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

        DepositoInfo::create($validate);

        return to_route("deposito-info.index");
    }

    public function show(string $id)
    {
        //
    }

    public function edit(DepositoInfo $depositoInfo)
    {
        return Inertia::render("deposito/carousel/form", [
            'data' => $depositoInfo
        ]);
    }

    public function update(Request $request, DepositoInfo $depositoInfo)
    {
        $validate = $request->validate([
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
        ]);

        $depositoInfo->update($validate);

        return to_route("deposito-info.index");
    }

    public function destroy(DepositoInfo $depositoInfo)
    {
        $depositoInfo->delete();

        return to_route("deposito-info.index");
    }
}
