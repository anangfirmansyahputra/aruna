<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', "admin@gmail.com")->first();

        if (!$user) {
            $user = User::create([
                'email' => "admin@gmail.com",
                'name' => 'admin',
                'password' => "rahasia",
            ]);
        }


        $user->assignRole('admin');
    }
}
