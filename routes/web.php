<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MarineCollectionController;
use App\Http\Controllers\JournalEntryController;

// Redirect homepage → Explore page
Route::get('/', function () {
    return redirect('/explore');
});

// Dashboard route (must exist BEFORE the auth group)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Marine Collection Routes
    Route::get('/explore', [MarineCollectionController::class, 'explore'])->name('explore');
    Route::get('/collection', [MarineCollectionController::class, 'index'])->name('collection.index');

    // API ROUTES
    Route::get('/api/species/search', [MarineCollectionController::class, 'search'])->name('species.search');
    Route::get('/api/species/{taxonId}', [MarineCollectionController::class, 'show'])->name('species.show');

    Route::post('/collection', [MarineCollectionController::class, 'store'])->name('collection.store');
    Route::patch('/collection/{collection}', [MarineCollectionController::class, 'update'])->name('collection.update');
    Route::delete('/collection/{collection}', [MarineCollectionController::class, 'destroy'])->name('collection.destroy');

    // Journal Routes
    Route::resource('journal', JournalEntryController::class);
});

require __DIR__.'/auth.php';
