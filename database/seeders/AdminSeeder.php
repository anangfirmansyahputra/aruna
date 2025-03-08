<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $role = Role::where('name', 'Admin')->first();
        $user = User::where('email', 'admin@gmail.com')->first();

        if ($role && !$user) {
            User::updateOrCreate([
                'email' => "admin@gmail.com",
                'name' => 'admin',
                'password' => "rahasia",
                'role_id' => $role->id
            ]);
        }
    }
}
