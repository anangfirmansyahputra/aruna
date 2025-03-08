<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'Dashboard',
                'group' => 'Dashboard',
                'icon' => 'DashboardOutlined',
                'path' => '/dashboard',
                'order' => 1,
            ],
            [
                'name' => 'Category',
                'group' => 'Products',
                'icon' => 'DatabaseOutlined',
                'path' => '/dashboard/categories',
                'order' => 2,
            ],
            [
                'name' => 'Product',
                'group' => 'Products',
                'icon' => 'ShoppingOutlined',
                'path' => '/dashboard/products',
                'order' => 3,
            ],
            [
                'name' => 'News',
                'group' => 'News',
                'icon' => 'ReadOutlined',
                'path' => '/dashboard/news',
                'order' => 4,
            ],
            [
                'name' => 'Menu',
                'group' => 'Security',
                'icon' => 'MenuUnfoldOutlined',
                'path' => '/dashboard/menus',
                'order' => 5
            ],
            [
                'name' => 'Role',
                'group' => 'Security',
                'icon' => 'SecurityScanOutlined',
                'path' => '/dashboard/roles',
                'order' => 6
            ],
            [
                'name' => 'User',
                'group' => 'Security',
                'icon' => 'UserOutlined',
                'path' => '/dashboard/users',
                'order' => 7
            ],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['name' => $menu['name']],
                $menu
            );
        }
    }
}
