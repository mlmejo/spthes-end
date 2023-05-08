<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use League\Csv\Reader;

class TeacherCsvController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'document' => 'required|file',
        ]);

        $file = $request->file('document');

        $reader = Reader::createFromPath($file->getPathname());
        $reader->setHeaderOffset(0);

        $headers = $reader->getHeader();

        $this->processTeachers($reader);
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
