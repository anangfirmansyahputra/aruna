<?php

namespace App\Http\Controllers;

use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Seo::all();

        return Inertia::render("seo/form", [
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validate = $this->validate($request);
        $seo = Seo::where("type", $validate['type'])->first();
        if ($seo) {
            $seo->update($validate);
        } else {
            Seo::create($validate);
        }
        return to_route("seo.index");
    }

    protected function validate(Request $request)
    {
        return $request->validate([
            'id_title' => "required|string",
            'en_title' => "required|string",
            "id_meta_descriptions" => "required|string",
            "en_meta_descriptions" => "required|string",
            "id_keywords" => "required|array",
            "en_keywords" => "required|array",
            "type" => "required|string"
        ]);
    }
}
