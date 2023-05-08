<?php

use App\Http\Controllers\EnrollmentCsvController;
use App\Http\Controllers\TeacherCsvController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::group(
    ['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']],
    function () {
        Route::resource('students', StudentController::class);
        Route::resource('teachers', TeacherController::class);
        Route::resource('sections', SectionController::class);

        Route::post('teachers/import', [TeacherCsvController::class, 'store'])
            ->name('teachers.csv-import');

        Route::post('sections/{section}/enrollments/import', [EnrollmentCsvController::class, 'store'])
            ->name('sections.enrollments.csv-import');
    }
);
