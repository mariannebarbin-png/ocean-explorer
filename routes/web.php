<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MarineCollectionController;
use App\Http\Controllers\JournalEntryController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Redirect homepage → Explore
Route::get('/', fn () => redirect('/explore'));

/*
|--------------------------------------------------------------------------
| Dashboard (must exist for Breeze)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| API ROUTES (keep OUTSIDE auth middleware)
|--------------------------------------------------------------------------
*/
Route::get('/api/species/search', [MarineCollectionController::class, 'search'])
    ->name('species.search');

Route::get('/api/species/{taxonId}', [MarineCollectionController::class, 'show'])
    ->name('species.show');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Explore
    Route::get('/explore', [MarineCollectionController::class, 'explore'])->name('explore');

    // Collection CRUD
    Route::prefix('collection')->group(function () {
        Route::get('/', [MarineCollectionController::class, 'index'])->name('collection.index');
        Route::post('/', [MarineCollectionController::class, 'store'])->name('collection.store');
        Route::patch('/{collection}', [MarineCollectionController::class, 'update'])->name('collection.update');
        Route::delete('/{collection}', [MarineCollectionController::class, 'destroy'])->name('collection.destroy');
    });
});

require __DIR__.'/auth.php';
