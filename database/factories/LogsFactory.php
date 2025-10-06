<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Logs;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogsFactory extends Factory
{
    protected $model = Logs::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'question' => fake()->paragraph(),
        ];
    }
}
