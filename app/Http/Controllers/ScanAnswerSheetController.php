<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use League\Csv\Reader;
use League\Csv\Writer;

class ScanAnswerSheetController extends Controller
{
    public function __invoke(Request $request, Exam $exam, Student $student)
    {
        $request->validate([
            'answer-sheet' => 'required|image',
        ]);

        $file = $request->file('answer-sheet');

        $records = [['Test Form Code', 'Source File']];

        $payload = ['', '',];
        foreach ($exam->questions as $i => $question) {
            array_push($records[0], 'Q' . ++$i);
            $alpha = ['A', 'B', 'C', 'D'];

            $choices = $question->choices;

            foreach ($choices as $j => $choice) {
                if ($choice->correct) {
                    array_push($payload, $alpha[$j]);
                }
            }
        }

        array_push($records, $payload);

        $csv = Writer::createFromString();

        $csv->insertAll($records);

        $response = Http::attach(
            'answer-sheet',
            file_get_contents($file),
            $file->getClientOriginalName()
        )->attach(
            'answer-key',
            $csv->toString(),
            'answer-key.csv',
        )->post('http://localhost:5000');

        $reader = Reader::createFromString($response->body());
        $reader->setHeaderOffset(0);

        $records = $reader->getRecords();

        foreach ($records as $record) {
            foreach ($exam->questions as $i => $question) {
                $answer = $record['Q' . ++$i];

                foreach ($question->choices as $j => $choice) {
                    $letters = ['A', 'B', 'C', 'D'];

                    if ($answer === $letters[$j]) {
                        Answer::create([
                            'student_id' => $student->id,
                            'exam_id' => $exam->id,
                            'choice_id' => $choice->id,
                        ]);
                    }
                }
            }
        }
    }
}
