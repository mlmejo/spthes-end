<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use League\Csv\Reader;

class ExamCsvHandlerController extends Controller
{
    public function create(Request $request, Enrollment $enrollment)
    {
        return Inertia::render('Exams/CsvImport', compact('enrollment'));
    }

    public function store(Request $request, Enrollment $enrollment)
    {
        $request->validate([
            'title' => 'required|string|max:255|unique:' . Exam::class,
            'document' => 'required|file',
        ]);

        $file = $request->file('document');

        $exam = Exam::create([
            'title' => $request->title,
            'enrollment_id' => $enrollment->id,
        ]);

        $reader = Reader::createFromPath($file->getPathname());

        foreach ($reader->getRecords() as $record) {
            $question = $exam->questions()->create([
                'content' => $record[0],
            ]);

            foreach (range(1, 4) as $index) {
                $content = trim($record[$index], '*');
                $correct = str_contains($record[$index], '*');

                $question->choices()->create(compact('content', 'correct'));
            }
        }
    }
}
