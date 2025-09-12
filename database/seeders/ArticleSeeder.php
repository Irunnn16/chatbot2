<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Spatie\Permission\Models\Permission;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Article model has SoftDeletes
        $permissions = [
            "menu article",
            "index article",
            "show article",
            "create article",
            "update article",
            "delete article",
            //"archived article",
            //"restore article",
            //"force delete article",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "article",
                'name' => $permit,
            ]);
        }
    }
}
