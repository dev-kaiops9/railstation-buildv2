<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\DutyRosterController;
use App\Http\Controllers\DutyShiftController;
use App\Http\Controllers\EmployeeRequirementController;
use App\Http\Controllers\TrainController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\TrainTracksController;
use App\Http\Controllers\GuardFormController;
use App\Http\Controllers\OperationalDisruptionController;
use App\Http\Controllers\IBPRController;
use App\Http\Controllers\RaiLibraryController;
use App\Http\Controllers\KRSMController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\WeatherController;


Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [UserController::class,'index'])->name('users.index');
    Route::get('/users/create', [UserController::class,'create'])->name('users.create');
    Route::post('/users/store', [UserController::class,'store'])->name('users.store');
    Route::get('/users/edit/{id}', [UserController::class,'edit'])->name('users.edit');
    Route::post('/users/update/{id}', [UserController::class,'update'])->name('users.update');
    Route::delete('/users/delete/{id}', [UserController::class,'destroy'])->name('users.destroy');

    Route::post('/change-station', function (Illuminate\Http\Request $request) {
        session(['station' => $request->station]);
        return back();
    })->name('change.station');


    Route::get('/profile', [StationController::class, 'index'])->name('profile');
    Route::post('/profile/update', [StationController::class, 'update'])->name('profile.update');

    Route::post('/station/change', [StationController::class, 'changeStation'])->name('station.change');
    Route::post('/station/emplasemen-update', [StationController::class, 'updateEmplasemen'])->name('station.emplasemen-update');

    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee');
    Route::get('/employee/get', [EmployeeController::class, 'get'])->name('employee.get');
    Route::post('/employee/save', [EmployeeController::class, 'store'])->name('employee.store');
    Route::post('/employee/update', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('/employee/delete', [EmployeeController::class, 'destroy'])->name('employee.destroy');
    Route::post('/employee/move', [EmployeeController::class, 'move'])->name('employee.move');
    Route::get('/employee/positions', [EmployeeController::class, 'positions'])->name('employee.positions');
    Route::get('/employee/{id}', [EmployeeController::class, 'show'])->name('employee.show');

    Route::get('/duty-roster', [DutyRosterController::class, 'index'])->name('duty-roster.index');
    Route::post('/duty-roster', [DutyRosterController::class, 'store'])->name('duty-roster.store');
    Route::put('/duty-roster/{id}', [DutyRosterController::class, 'update'])->name('duty-roster.update');
    Route::delete('/duty-roster/{id}', [DutyRosterController::class, 'destroy'])->name('duty-roster.destroy');
    Route::post('/duty-roster/assign-shift', [DutyRosterController::class, 'assignShift'])->name('duty-roster.assign-shift');
    Route::post('/duty-roster/bulk-assign', [DutyRosterController::class, 'bulkAssign'])->name('duty-roster.bulk-assign');
    Route::get('/duty-roster/monthly', [DutyRosterController::class, 'getMonthlyRoster'])->name('duty-roster.monthly');
    Route::post('/duty-roster/copy-previous', [DutyRosterController::class, 'copyFromPreviousMonth'])->name('duty-roster.copy-previous');
    Route::get('/duty-shifts', [DutyRosterController::class, 'getDutyShifts'])->name('duty-shifts.index');

    Route::get('/requirements/get', [EmployeeRequirementController::class, 'get'])->name('requirements.get');
    Route::post('/requirements/save', [EmployeeRequirementController::class, 'store'])->name('requirements.store');
    Route::post('/requirements/delete', [EmployeeRequirementController::class, 'destroy'])->name('requirements.destroy');

    Route::get('/shifts/get', [DutyShiftController::class, 'get'])->name('shifts.get');
    Route::post('/shifts/save', [DutyShiftController::class, 'store'])->name('shifts.store');
    Route::post('/shifts/delete', [DutyShiftController::class, 'destroy'])->name('shifts.destroy');

    Route::get('/train', [TrainController::class, 'index'])->name('train');
    Route::get('/train/get', [TrainController::class, 'get'])->name('train.get');
    Route::post('/train/save', [TrainController::class, 'store'])->name('train.store');
    Route::post('/train/delete', [TrainController::class, 'destroy'])->name('train.destroy');

    Route::get('/track/get', [TrackController::class, 'get'])->name('track.get');
    Route::post('/track/delete', [TrackController::class, 'destroy'])->name('track.delete');
    Route::post('/track/save', [TrackController::class, 'store'])->name('track.store');
    Route::post('/track/validity', [StationController::class, 'updateTrackValidity'])->name('track.validity');

    Route::get('/passed-tracks/get', [TrainTracksController::class, 'get'])->name('passed-tracks.get');
    Route::post('/passed-tracks/save', [TrainTracksController::class, 'store'])->name('passed-tracks.store');
    Route::post('/passed-tracks/delete', [TrainTracksController::class, 'destroy'])->name('passed-tracks.delete');

    Route::get('/guard-form', [GuardFormController::class, 'index'])->name('guard-form');
    Route::get('/guard-form/get', [GuardFormController::class, 'get'])->name('guard-form.get');
    Route::post('/guard-form/save', [GuardFormController::class, 'store'])->name('guard-form.store');
    Route::post('/guard-form/delete', [GuardFormController::class, 'destroy'])->name('guard-form.delete');

    Route::get('/operational-disruption', [OperationalDisruptionController::class, 'index'])->name('operational-disruption');
    Route::get('/operational-disruption/get', [OperationalDisruptionController::class, 'get'])->name('operational-disruption.get');
    Route::post('/operational-disruption/save', [OperationalDisruptionController::class, 'store'])->name('operational-disruption.store');
    Route::post('/operational-disruption/delete', [OperationalDisruptionController::class, 'destroy'])->name('operational-disruption.delete');

    Route::get('/ibpr', [IBPRController::class, 'index'])->name('ibpr');
    Route::get('/ibpr/get', [IBPRController::class, 'get'])->name('ibpr.get');
    Route::post('/ibpr/save', [IBPRController::class, 'store'])->name('ibpr.store');
    Route::post('/ibpr/delete', [IBPRController::class, 'destroy'])->name('ibpr.delete');

    Route::get('/railibrary', [RaiLibraryController::class, 'index'])->name('railibrary');
    Route::get('/railibrary/get', [RaiLibraryController::class, 'get'])->name('railibrary.get');
    Route::post('/railibrary/store', [RaiLibraryController::class, 'store'])->name('railibrary.store');
    Route::post('/railibrary/update/{library}', [RaiLibraryController::class, 'update'])->name('railibrary.update');
    Route::post('/railibrary/delete', [RaiLibraryController::class, 'destroy'])->name('railibrary.delete');
    Route::get('/railibrary/{library}/stream-pdf', [RaiLibraryController::class, 'streamPdf'])->name('railibrary.stream-pdf');
    Route::get('/railibrary/{library}/download', [RaiLibraryController::class, 'download'])->name('railibrary.download');

    Route::get('/krsm', [KRSMController::class, 'index'])->name('krsm');
    Route::get('/krsm/get', [KRSMController::class, 'get'])->name('krsm.get');
    Route::post('/krsm/save', [KRSMController::class, 'save'])->name('krsm.save');
    Route::post('/krsm/update/{usage}', [KRSMController::class, 'update'])->name('krsm.update');
    Route::post('/krsm/delete', [KRSMController::class, 'destroy'])->name('krsm.delete');

    Route::post('/ibpr/import', [IBPRController::class, 'import'])->name('ibpr.import');
    //Route::get('/cuaca', [WeatherController::class, 'index']);
    Route::post('/ibpr/export-pdf', [IBPRController::class, 'exportPdf'])
    ->name('ibpr.export');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

use App\Http\Controllers\WeatherController;

Route::get('/weather', [WeatherController::class, 'index'])->name('weather.index');

require __DIR__.'/auth.php';


