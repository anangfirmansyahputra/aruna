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
                'name' => 'Testimonial',
                'group' => 'Dashboard',
                'icon' => 'UserSwitchOutlined',
                'path' => '/dashboard/testimonials',
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
                'name' => 'Feature',
                'group' => 'Products',
                'icon' => 'ShoppingOutlined',
                'path' => '/dashboard/product-features',
            ],
            [
                'name' => 'Requirement',
                'group' => 'Products',
                'icon' => 'ShoppingOutlined',
                'path' => '/dashboard/product-requirements',
            ],
            [
                'name' => 'Interest Rate',
                'group' => 'Products',
                'icon' => 'PercentageOutlined',
                'path' => '/dashboard/interest-rates',
            ],
            [
                'name' => 'FAQ Product',
                'group' => 'Products',
                'icon' => 'QuestionCircleOutlined',
                'path' => '/dashboard/product-faqs',
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
            [
                'name' => 'FAQ',
                'group' => 'FAQ',
                'icon' => 'QuestionCircleOutlined',
                'path' => '/dashboard/faqs',
            ],
            [
                'name' => 'Home Page',
                'group' => 'Content',
            ],
            [
                'name' => 'About Page',
                'group' => 'Content',
            ],
            [
                'name' => 'Team Profile',
                'group' => 'Content',
                'submenu' => 'About Page',
                'path' => '/dashboard/team-profiles',
            ],
            [
                'name' => 'Company Value',
                'group' => 'Content',
                'submenu' => 'About Page',
                'path' => '/dashboard/company-values',
            ],
            [
                'name' => 'SEO',
                'group' => 'SEO',
                'icon' => 'ProductOutlined',
                'path' => '/dashboard/seo',
            ],
        ];

        Menu::query()->delete();

        $count = 1;

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['name' => $menu['name']],
                [
                    'name' => $menu['name'],
                    "group" => $menu["group"] ?? null,
                    "icon" => $menu["icon"] ?? null,
                    "path" => $menu["path"] ?? null,
                    "order" => $count,
                    "submenu" => $menu["submenu"] ?? null
                ]
            );

            $count++;
        }
    }
}
