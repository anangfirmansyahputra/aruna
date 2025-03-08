<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();

        return Inertia::render('role/page', [
            'data' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $menus = Menu::all();
        $permissions = Permission::all();

        return Inertia::render('role/form', [
            'menus' => $menus,
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string'
        ]);

        DB::beginTransaction();

        try {
            $role = Role::create($validate);
            $role->menus()->syncWithoutDetaching($request->menus);
            $role->permissions()->syncWithoutDetaching($request->permissions);

            DB::commit();
            return to_route('roles.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $menus = Menu::all();
        $permissions = Permission::all();

        return Inertia::render('role/form', [
            'menus' => $menus,
            'permissions' => $permissions,
            'role' => $role,
            'selectedMenus' => $role->menus()->pluck('id'),
            'selectedPermissions' => $role->permissions()->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validate = $request->validate([
            'name' => 'required|string'
        ]);

        DB::beginTransaction();

        try {
            $role->update($validate);

            // Pastikan hanya menus & permissions yang dikirim tetap terhubung
            $role->menus()->sync($request->menus ?? []);
            $role->permissions()->sync($request->permissions ?? []);

            DB::commit();
            return to_route('roles.index');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
