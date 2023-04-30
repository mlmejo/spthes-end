<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamAnswerController extends Controller
{
    public function index(Exam $exam)
    {
        return Inertia::render('Answers/Index', [
            'exam' => $exam->load('questions'),
            'enrollment' => $exam->enrollment
                ->load('section', 'teacher.user', 'students.user', 'students.answers.choice'),
        ]);
    }

    public function store(Request $request, Exam $exam)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        foreach ($request->answers as $answer) {
            $exam->answers()->create([
                'student_id' => $request->user()->userable_id,
                'question_id' => $answer['question_id'],
                'choice_id' => $answer['choice_id'],
            ]);
        }

        return redirect()->route('enrollments.exams.index', [$exam->enrollment_id, $exam]);
    }

    public function show(Request $request, Exam $exam, Student $student)
    {
        $answers = $student->answers->load('choice.question.choices');

        return Inertia::render('Answers/Show', [
            'exam' => $exam->load('questions.choices'),
            'student' => $student,
            'answers' => $answers,
        ]);
    }
}
