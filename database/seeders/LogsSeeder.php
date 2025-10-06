<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Logs;
use Spatie\Permission\Models\Permission;

class LogsSeeder extends Seeder
{
    public function run(): void
    {
        Logs::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Logs model has SoftDeletes
        $permissions = [
            "menu logs",
            "index logs",
            "show logs",
            "create logs",
            "update logs",
            "delete logs",
            //"archived logs",
            //"restore logs",
            //"force delete logs",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "logs",
                'name' => $permit,
            ]);
        }
    }
}
