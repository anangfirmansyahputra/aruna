<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role =  Role::updateOrCreate([
            'name' => 'Admin'
        ]);

        $permissions = Permission::all();

        $role->givePermissionTo($permissions);

        Role::updateOrCreate([
            'name' => 'Front Office'
        ]);
    }
}
