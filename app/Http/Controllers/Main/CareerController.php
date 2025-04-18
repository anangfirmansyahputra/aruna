<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\CareerRequest;
use App\Models\Seo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $seo = Seo::where("type", "career")->first();
        return Inertia::render("main/career/page", [
            'seo' => $seo
        ]);
    }

    public function all()
    {
        $careers = Career::latest()->get();
        $seo = Seo::where("type", "career")->first();
        return Inertia::render("main/career/all", [
            'seo' => $seo,
            'careers' => $careers
        ]);
    }

    public function form()
    {
        $careers = Career::latest()->get();
        return Inertia::render('main/career/form', [
            'careers' => $careers
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ["required", "string"],
            "email" => ["required", "string"],
            "no_hp" => ["required", "string"],
            "career_id" => ['required', 'exists:careers,id'],
            'cv' => ['required', 'file', 'mimes:pdf']
        ]);

        if ($request->hasFile("cv")) {
            $data['cv'] = $request->file('cv')->store('cv', 'public');
        }

        CareerRequest::create($data);
        return back();
    }
}
