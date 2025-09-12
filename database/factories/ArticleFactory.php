<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        return [
            'user_id' => User::pluck('id')->random(),
            'title' => fake()->sentence(),
            'kategori' => fake()->word(),
            'content' => fake()->paragraph(),
        ];
    }
}
