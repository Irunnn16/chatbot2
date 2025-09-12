<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prospect;
use Spatie\Permission\Models\Permission;

class ProspectSeeder extends Seeder
{
    public function run(): void
    {
        Prospect::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Prospect model has SoftDeletes
        $permissions = [
            "menu prospect",
            "index prospect",
            "show prospect",
            "create prospect",
            "update prospect",
            "delete prospect",
            //"archived prospect",
            //"restore prospect",
            //"force delete prospect",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "prospect",
                'name' => $permit,
            ]);
        }
    }
}
