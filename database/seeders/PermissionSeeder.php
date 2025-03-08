<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Dashboard Permissions
            ['name' => 'View Dashboard', 'codes' => 'dashboard.index'],

            // Category Permissions
            ['name' => 'View Category', 'codes' => 'categories.index'],
            ['name' => 'Create Category', 'codes' => 'categories.create'],
            ['name' => 'Store Category', 'codes' => 'categories.store'],
            ['name' => 'Edit Category', 'codes' => 'categories.edit'],
            ['name' => 'Update Category', 'codes' => 'categories.update'],
            ['name' => 'Delete Category', 'codes' => 'categories.delete'],

            // Product Permissions
            ['name' => 'View Product', 'codes' => 'products.index'],
            ['name' => 'Create Product', 'codes' => 'products.create'],
            ['name' => 'Store Product', 'codes' => 'products.store'],
            ['name' => 'Edit Product', 'codes' => 'products.edit'],
            ['name' => 'Update Product', 'codes' => 'products.update'],
            ['name' => 'Delete Product', 'codes' => 'products.delete'],

            // News Permissions
            ['name' => 'View News', 'codes' => 'news.index'],
            ['name' => 'Create News', 'codes' => 'news.create'],
            ['name' => 'Store News', 'codes' => 'news.store'],
            ['name' => 'Edit News', 'codes' => 'news.edit'],
            ['name' => 'Update News', 'codes' => 'news.update'],
            ['name' => 'Delete News', 'codes' => 'news.delete'],

            // Menu
            ['name' => 'View Menu', 'codes' => 'menus.index'],
            ['name' => 'Edit Menu', 'codes' => 'menus.edit'],
            ['name' => 'Update Menu', 'codes' => 'menus.update'],

            // Role
            ['name' => 'View Role', 'codes' => 'roles.index'],
            ['name' => 'Create Role', 'codes' => 'roles.create'],
            ['name' => 'Store Role', 'codes' => 'roles.store'],
            ['name' => 'Edit Role', 'codes' => 'roles.edit'],
            ['name' => 'Update Role', 'codes' => 'roles.update'],
            ['name' => 'Delete Role', 'codes' => 'roles.delete'],

            // User
            ['name' => 'View User', 'codes' => 'users.index'],
            ['name' => 'Create User', 'codes' => 'users.create'],
            ['name' => 'Store User', 'codes' => 'users.store'],
            ['name' => 'Edit User', 'codes' => 'users.edit'],
            ['name' => 'Update User', 'codes' => 'users.update'],
            ['name' => 'Delete User', 'codes' => 'users.delete'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['codes' => $permission['codes']], // Cek berdasarkan 'codes' untuk menghindari duplikasi
                ['name' => $permission['name']]
            );
        }
    }
}
