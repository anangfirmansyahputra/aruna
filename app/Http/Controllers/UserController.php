<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get();

        return Inertia::render('user/page', [
            'data' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('user/form', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Debug request untuk memastikan data yang dikirim benar
        // dd($request->all());

        // Validasi input
        $validate = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|array',
            'role_id.*' => 'exists:roles,id'
        ]);

        try {
            // Buat user baru
            $user = User::create([
                'name' => $validate['name'],
                'email' => $validate['email'],
                'password' => bcrypt($validate['password']) // Enkripsi password
            ]);

            // Ambil roles dari database berdasarkan ID yang dikirim
            $roles = Role::whereIn('id', $validate['role_id'])->pluck('name')->toArray();

            // Assign multiple roles ke user
            $user->assignRole($roles);

            return to_route('users.index')->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('user/form', [
            'roles' => $roles,
            'user' => $user->load('roles')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validate = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string',
            'role_id' => 'required|array',
            'role_id.*' => 'exists:roles,id'
        ]);

        try {
            // Jika password kosong, hapus dari array validasi
            if (empty($validate['password'])) {
                unset($validate['password']);
            } else {
                $validate['password'] = bcrypt($validate['password']);
            }

            // Update data user
            $user->update($validate);

            // Update roles untuk user
            $user->roles()->sync($validate['role_id']); // Menyinkronkan role baru

            return to_route('users.index')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('users.index');
    }
}
