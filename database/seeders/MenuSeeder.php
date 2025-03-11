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
            ],
            [
                'name' => 'Category',
                'group' => 'Products',
                'icon' => 'DatabaseOutlined',
                'path' => '/dashboard/categories',
            ],
            [
                'name' => 'Product',
                'group' => 'Products',
                'icon' => 'ShoppingOutlined',
                'path' => '/dashboard/products',
            ],
            [
                'name' => 'FAQ',
                'group' => 'Products',
                'icon' => 'QuestionCircleOutlined',
                'path' => '/dashboard/faqs',
            ],
            [
                'name' => 'Article',
                'group' => 'News',
                'icon' => 'ReadOutlined',
                'path' => '/dashboard/articles',
            ],
            [
                'name' => 'Report',
                'group' => "Financing",
                'icon' => "DollarOutlined",
                "path" => "/dashboard/reports",
            ],
            [
                'name' => 'Menu',
                'group' => 'Security',
                'icon' => 'MenuUnfoldOutlined',
                'path' => '/dashboard/menus',
            ],
            [
                'name' => 'Role',
                'group' => 'Security',
                'icon' => 'SecurityScanOutlined',
                'path' => '/dashboard/roles',
            ],
            [
                'name' => 'User',
                'group' => 'Security',
                'icon' => 'UserOutlined',
                'path' => '/dashboard/users',
            ],
        ];

        $count = 1;
        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['name' => $menu['name']],
                [
                    'name' => $menu['name'],
                    "group" => $menu["group"],
                    "icon" => $menu["icon"],
                    "path" => $menu["path"],
                    "order" => $count
                ]
            );

            $count++;
        }
    }
}
