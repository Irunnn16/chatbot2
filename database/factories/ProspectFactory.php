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
        $kode = ['TI', 'SI', 'DKV', 'MN', 'AK'];
        $prospek_kerja = [
            'Software Developer',
            'System Analyst',
            'UI/UX Designer',
            'Project Manager',
            'Financial Analyst',
            'Data Scientist',
            'Network Administrator',
            'Digital Marketer',
            'Business Consultant',
            'Cybersecurity Specialist'
        ];
        return [
            'jurusan' => fake()->randomElement($jurusan),
            'kode' => fake()->randomElement($kode),
            'prospek_kerja' => fake()->randomElement($prospek_kerja),
        ];
    }
}
