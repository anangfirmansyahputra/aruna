<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::all();

        return Inertia::render('menu/page', [
            'data' => $menus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $menus = Menu::all();

        // return Inertia::render('menu/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $validate = $request->validate([
        //     'name' => 'required|string|min:3',
        //     'path' => 'required|string|min:3',
        //     'icon' => 'required|string',
        //     'group' => "string"
        // ]);

        // try {
        //     Menu::create($validate);
        //     return to_route('menus.index');
        // } catch (\Exception $e) {
        //     return back()->with('error', $e->getMessage());
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        return Inertia::render('menu/form', [
            'menu' => $menu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $validate = $request->validate([
            'name' => 'required|string|min:3',
            'path' => 'required|string|min:3',
            'icon' => 'required|string',
            'group' => "string"
        ]);

        try {
            $menu->update($validate);
            return to_route('menus.index');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        //
    }
}
