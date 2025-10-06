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
        $titleWords = ['The Future of', 'Understanding', 'Exploring', 'The Impact of', 'Advancements in'];
        $categories = ['Technology', 'Health', 'Finance', 'Education', 'Travel'];
        $contentPhrases = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ];
        return [
            'user_id' => User::pluck('id')->random(),
            'title' => fake()->randomElement($titleWords) . ' ' . fake()->word(),
            'kategori' => fake()->randomElement($categories),
            'content' => fake()->randomElement($contentPhrases),
        ];
    }
}
