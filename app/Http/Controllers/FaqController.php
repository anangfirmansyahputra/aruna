<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Faq::all();
        return Inertia::render("faq/page", [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("faq/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $this->validate($request);
        Faq::create($validate);
        return to_route("faqs.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        return Inertia::render("faq/form", [
            "faq" => $faq
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faq $faq)
    {
        $validate = $this->validate($request);
        $faq->update($validate);
        return to_route("faqs.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();
        return to_route("faqs.index");
    }

    protected function validate(Request $request)
    {
        return $request->validate([
            "id_question" => "required|string",
            "en_question" => "required|string",
            "id_answer" => "required|string",
            "en_answer" => "required|string"
        ]);
    }
}
