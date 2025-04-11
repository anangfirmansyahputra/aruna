<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $careers = Career::all();
        return Inertia::render("career/page", [
            'data' => $careers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("career/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "id_title" => "required|string",
            "en_title" => "required|string",
            "id_requirement" => "required|string",
            "en_requirement" => "required|string",
        ]);

        Career::create($validate);

        return redirect()->route("careers.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Career $career)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Career $career)
    {
        return Inertia::render("career/form", [
            'data' => $career
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Career $career)
    {
        $validate = $request->validate([
            "id_title" => "required|string",
            "en_title" => "required|string",
            "id_requirement" => "required|string",
            "en_requirement" => "required|string",
        ]);

        $career->update($validate);

        return redirect()->route("careers.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Career $career)
    {
        $career->delete();
        return redirect()->route("careers.index");
    }
}
