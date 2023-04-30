<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'section_id' => ['required', Rule::exists(Section::class, 'id')],
            'teacher_id' => ['required', 'integer'],
        ]);

        $enrollment = Enrollment::where($validated)->first();

        if ($enrollment === null) {
            return response()->json([]);
        }

        return response()->json($enrollment->load('students.user'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'section_id' => ['required', Rule::exists(Section::class, 'id')],
            'teacher_id' => ['required', Rule::exists(Teacher::class, 'id')],
            'student_ids' => ['sometimes', 'nullable', 'array'],
        ]);

        $enrollment = Enrollment::firstOrCreate([
            'section_id' => $request->section_id,
            'teacher_id' => $request->teacher_id,
        ]);

        $students = Student::findMany($request->student_ids);

        $enrollment->students()->sync($students);

        return redirect()->route('sections.edit', $request->section_id);
    }
}
