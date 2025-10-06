<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Logs extends Model 
{
    use HasFactory;
    
    

    //protected $table = 'logs';

    /*
    protected $fillable = [
        'user_id',
        'category_id',
        'question'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
}
