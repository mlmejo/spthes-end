<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Enrollment;
use App\Models\Exam;
use App\Models\Question;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Enrollment $enrollment)
    {
        return Inertia::render('Exams/Create', compact('enrollment'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'title' => 'required|string',
            'questions' => 'array',
        ]);

        $exam = $enrollment->exams()->create([
            'title' => $request->title,
        ]);

        foreach ($request->questions as $question) {
            $new_question = $exam->questions()->create([
                'content' => $question['content'],
            ]);

            foreach ($question['choices'] as $choice) {
                $new_question->choices()->create([
                    'content' => $choice['content'],
                    'correct' => $choice['correct'],
                ]);
            }
        }

        return redirect()->route('enrollments.show', $enrollment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Enrollment $enrollment, Exam $exam)
    {
        $user = $request->user();

        if ($user->userable_type === Student::class && $user->userable->answers()->where('exam_id', $exam->id)->count() > 0) {
            return redirect()->route('exams.answers.show', [$exam, $user->userable]);
        }

        return Inertia::render('Exams/Show', [
            'enrollment' => $enrollment,
            'exam' => $exam->load('questions.choices'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        //
    }
}
