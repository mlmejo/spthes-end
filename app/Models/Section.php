<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'academic_level_id'];

    public function academic_level()
    {
        return $this->belongsTo(AcademicLevel::class);
    }
}
