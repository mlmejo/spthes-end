<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use League\Csv\Reader;

class EnrollmentCsvController extends Controller
{
    public function store(Request $request, Section $section)
    {
        $request->validate([
            'document' => 'required|file',
            'teacher' => ['required', Rule::exists(Teacher::class, 'id')],
        ]);

        $enrollment = Enrollment::firstOrCreate([
            'section_id' => $section->id,
            'teacher_id' => $request->teacher,
        ]);

        $enrollment->students()->detach();

        $file = $request->file('document');

        $reader = Reader::createFromPath($file->getPathname());
        $reader->setHeaderOffset(0);

        foreach ($reader->getRecords() as $record) {
            $academic_level = AcademicLevel::where('name', $record['academic_level'])->first();

            if ($academic_level === null) {
                throw new \Exception('Academic Level with name ' . $record['academic_level'] . ' not found.');
            }

            $student = Student::firstOrCreate([
                'academic_level_id' => $academic_level->id,
            ]);

            $user = User::where('email', $record['email'])->first();

            if ($user === null) {
                $user = User::create([
                    'name' => $record['name'],
                    'email' => $record['email'],
                    'password' => Hash::make('password'),
                ]);
            }

            $student->user()->save($user);

            $user->assignRole('student');

            $enrollment->students()->syncWithoutDetaching([$student->id]);
        }

        return redirect()->route('students.index');
    }
}
