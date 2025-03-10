<?php

namespace App\Listeners;

use Illuminate\Routing\Router;
use Spatie\Permission\Models\Permission;

class GeneratePermissions
{
    public function __construct(protected Router $router) {}

    public function handle()
    {
        $routes = $this->router->getRoutes();

        foreach ($routes as $route) {
            $action = $route->getAction();
            if (!isset($action['controller'])) {
                continue;
            }

            $controllerAction = explode('@', $action['controller']);
            if (count($controllerAction) !== 2) {
                continue;
            }

            $permissionName = strtolower(str_replace('Controller', '', $controllerAction[0]) . '-' . $controllerAction[1]);

            // Cek apakah permission sudah ada
            if (!Permission::where('name', $permissionName)->exists()) {
                Permission::create(['name' => $permissionName]);
            }
        }
    }
}
