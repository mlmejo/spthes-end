<?php

use App\Http\Controllers\AdminCsvHandlerController;
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

        Route::get('import', [AdminCsvHandlerController::class, 'create'])
            ->name('admin.csv-import');

        Route::post('import', [AdminCsvHandlerController::class, 'store']);
    }
);
