<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicLevel extends Model
{
    use HasFactory;

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }
}
