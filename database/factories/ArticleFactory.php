<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'user_id' => fake()->word(),
            'title' => fake()->sentence(),
            'kategori' => fake()->sentence(),
            'content' => fake()->paragraph(),
        ];
    }
}
