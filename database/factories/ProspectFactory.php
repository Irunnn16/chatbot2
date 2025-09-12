<?php

namespace Database\Factories;

use App\Models\Prospect;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProspectFactory extends Factory
{
    protected $model = Prospect::class;

    public function definition(): array
    {
        $jurusan = ['Teknik Informatika', 'Sistem Informasi', 'Desain Komunikasi Visual', 'Manajemen', 'Akuntansi'];
        return [
            'jurusan' => fake()->randomElement($jurusan),
            'kode' => fake()->word(),
            'prospek_kerja' => fake()->paragraph(),
        ];
    }
}
