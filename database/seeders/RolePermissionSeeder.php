<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'Admin')->first();
        $permissions = Permission::pluck('id')->toArray(); // Ambil semua ID permission sebagai array

        // Hanya attach permission yang belum ada
        $adminRole->permissions()->syncWithoutDetaching($permissions);
    }
}
