<?php

use App\Http\Controllers\Api\AcademicLevelController;
use App\Http\Controllers\Api\EnrollmentController as ApiEnrollmentController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\EnrollmentExamController;
use App\Http\Controllers\ExamAnswerController;
use App\Http\Controllers\ExamCsvHandlerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanAnswerSheetController;
use App\Http\Controllers\UserDashboardController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'register/admin');

Route::get('/dashboard', UserDashboardController::class)
    ->middleware('auth')
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'api', 'as' => 'api.', 'middleware' => 'auth'], function () {
    Route::get('academic-levels', [AcademicLevelController::class, 'index'])
        ->name('academic-levels.index');

    Route::get('students', [StudentController::class, 'index'])
        ->name('students.index');

    Route::get('teachers', [TeacherController::class, 'index'])
        ->name('teachers.index');

    Route::resource('enrollments', ApiEnrollmentController::class);
});

Route::resource('enrollments', EnrollmentController::class)
    ->middleware('auth', 'role:student,teacher');

Route::get('/enrollments/{enrollment}/exams/import', [ExamCsvHandlerController::class, 'create'])
    ->middleware(['auth', 'role:teacher'])
    ->name('exams.csv-import');

Route::post('/enrollments/{enrollment}/exams/import', [ExamCsvHandlerController::class, 'store'])
    ->middleware(['auth', 'role:teacher']);

Route::resource('enrollments.exams', EnrollmentExamController::class)
    ->middleware(['auth', 'role:student,teacher']);

Route::resource('exams.answers', ExamAnswerController::class)
    ->except('show')
    ->middleware(['auth', 'role:student,teacher']);

Route::get('/exams/{exam}/answers/{student}', [ExamAnswerController::class, 'show'])
    ->middleware(['auth', 'role:student,teacher'])
    ->name('exams.answers.show');

Route::post('/exams/{exam}/answers/{student}/scan', ScanAnswerSheetController::class)
    ->middleware(['auth', 'role:teacher'])
    ->name('answers.scan');

require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
