<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = ['academic_level_id'];

    public function user()
    {
        return $this->morphOne(User::class, 'userable');
    }

    public function academic_level()
    {
        return $this->belongsTo(AcademicLevel::class);
    }

    public function enrollments()
    {
        return $this->belongsToMany(Enrollment::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
