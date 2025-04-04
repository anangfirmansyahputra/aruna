<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Routing\Route;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run()
    {
        Permission::query()->delete();

        $routeCollection = app('router')->getRoutes();

        foreach ($routeCollection as $route) {
            $action = $route->getAction();

            if (!empty($action['as'])) {

                // Cek apakah permission sudah ada sebelum dibuat
                if (!Permission::where('name', $action['as'])->exists()) {
                    Permission::create(['name' => $action['as'], 'guard_name' => 'web']);
                }
            }
        }
    }
}
