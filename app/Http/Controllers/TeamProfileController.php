<?php

namespace App\Http\Controllers;

use App\Models\TeamProfile;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TeamProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("team-profile/page", [
            'data' => TeamProfile::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("team-profile/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => "required|string",
            "en_title" => "required|string",
            "id_title" => "required|string",
            "en_description" => "required|string",
            "id_description" => "required|string",
            "image_url" => "required|mimes:jpeg,jpg,png,gif,svg|max:1000"
        ]);

        if ($request->hasFile("image_url")) {
            $validate["image_url"] = $request->file("image_url")->store('team_profile', 'public');
        }

        TeamProfile::create($validate);

        return to_route("team-profiles.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamProfile $teamProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TeamProfile $teamProfile)
    {
        return Inertia::render("team-profile/form", [
            'data' => $teamProfile
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TeamProfile $teamProfile)
    {
        $validate = $request->validate([
            'name' => "required|string",
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

        $teamProfile->update($validate);

        return to_route("team-profiles.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamProfile $teamProfile)
    {
        $teamProfile->delete();

        return to_route("team-profiles.index");
    }
}
