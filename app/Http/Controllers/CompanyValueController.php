<?php

namespace App\Http\Controllers;

use App\Models\CompanyValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyValueController extends Controller
{
    private function validate(Request $request)
    {
        return $request->validate([
            'en_title' => "required|string",
            'id_title' => "required|string",
            'en_description' => "required|string",
            'id_description' => "required|string",
            'icon' => "required|string"
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = CompanyValue::all();

        return Inertia::render("company-value/page", [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("company-value/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $this->validate($request);
        CompanyValue::create($validate);

        return to_route("company-values.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyValue $companyValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompanyValue $companyValue)
    {
        return Inertia::render("company-value/form", [
            'data' => $companyValue
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompanyValue $companyValue)
    {
        $validate = $this->validate($request);
        $companyValue->update($validate);

        return to_route("company-values.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyValue $companyValue)
    {
        $companyValue->delete();
        return to_route("company-values.index");
    }
}
