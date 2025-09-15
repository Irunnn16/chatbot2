<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Spatie\Permission\Models\Permission;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        {
        Category::create([
            'name' => 'Tentang LP3i',
        ]);
        Category::create([
            'name' => 'Jurusan Di Lp3i',
        ]);
        Category::create([
            'name' => 'Prospek Kerja Lulus dari Lp3i',
        ]);
        Category::create([
            'name' => 'Rincian Biaya',
        ]);
    }

        // uncommand archived, restore and force delete if Category model has SoftDeletes
        $permissions = [
            "menu category",
            "index category",
            "show category",
            "create category",
            "update category",
            "delete category",
            //"archived category",
            //"restore category",
            //"force delete category",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "category",
                'name' => $permit,
            ]);
        }
    }
}
