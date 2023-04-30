<?php

namespace App\Http\Controllers;

use App\Models\AcademicLevel;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use League\Csv\Reader;

class AdminCsvHandlerController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/CsvImport');
    }

    public function store(Request $request)
    {
        $request->validate([
            'document' => 'required|file',
        ]);

        $file = $request->file('document');

        $reader = Reader::createFromPath($file->getPathname());
        $reader->setHeaderOffset(0);

        $headers = $reader->getHeader();

        if (in_array('academic_level', $headers)) {
            $this->processStudents($reader);
        }

        $this->processTeachers($reader);
    }

    private function processStudents(Reader $handle)
    {
        foreach ($handle->getRecords() as $record) {
            $academic_level = AcademicLevel::where('name', $record['academic_level'])->first();

            if ($academic_level === null) {
                throw new \Exception('Academic Level with name ' . $record['academic_level'] . ' not found.');
            }

            if (User::where('email', $record['email'])->first() !== null) {
                return;
            }

            $student = Student::create([
                'academic_level_id' => $academic_level->id,
            ]);

            $user = $student->user()->create([
                'name' => $record['name'],
                'email' => $record['email'],
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('student');
        }
    }

    private function processTeachers($handle)
    {
        foreach ($handle->getRecords() as $record) {
            if (User::where('email', $record['email'])->first() !== null) {
                return;
            }

            $teacher = Teacher::create();

            $user = $teacher->user()->create([
                'name' => $record['name'],
                'email' => $record['email'],
                'password' => Hash::make('password'),
            ]);

            $user->assignRole('teacher');
        }
    }
}
