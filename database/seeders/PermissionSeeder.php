<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionGroups = [
            "settings" => [
                "open adminer" => ['superadmin'],
            ],
            "dashboard" => [
                "profile" => ["*"],
                "documentation" => ["*"]
    ],
            "article" => [
                "view article" => ["*"],
                "create article" => ["superadmin", "admin"],
                "edit article" => ["superadmin", "admin"],
                "delete article" => ["superadmin", "admin"],
            ],
            "prospect" => [
                "view prospect" => ["*"],
                "create prospect" => ["superadmin", "admin"],
                "edit prospect" => ["superadmin", "admin"],
                "delete prospect" => ["superadmin", "admin"],
            ],
            "user" => [
                "view user" => ["superadmin", "admin"],
                "create user" => ["superadmin", "admin"],        
                "edit user" => ["superadmin", "admin"],
                "delete user" => ["superadmin", "admin"],
            ],     
            
            "category" => [
                "menu category" => ["superadmin", "admin"],
                "view category" => ["superadmin", "admin"],
                "create category" => ["superadmin", "admin"],
                "edit category" => ["superadmin", "admin"],
                "delete category" => ["superadmin", "admin"],
            ],
            "logs" => [
                "menu logs" => ["superadmin", "admin"],
                "view logs" => ["superadmin", "admin"],
                "delete logs" => ["superadmin", "admin"],
            ],

            "role" => [
                "menu role" => ["superadmin"],
                "view role" => ["superadmin"],
                "create role" => ["superadmin" ],        
                "edit role" => ["superadmin"],
                "delete role" => ["superadmin"],
    ],
        ];

        foreach ($permissionGroups as $group => $permissions) {
            foreach ($permissions as $permissionName => $roles) {
                $permission = Permission::updateOrCreate([
                    'name'  => $permissionName,
                    'group' => $group,
                ], []);
                
                if ($roles === ["*"]) {
                    $roles = Role::all()->pluck('name')->toArray();
                }

                foreach ($roles as $roleName) {
                    $role = Role::where('name', $roleName)->first();
                    if ($role) {
                        $role->givePermissionTo($permission);
                    }
                }
            }
        }
    }
}
