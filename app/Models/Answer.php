<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'choice_id', 'exam_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function choice()
    {
        return $this->belongsTo(Choice::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
