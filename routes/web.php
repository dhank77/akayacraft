<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public products page
Route::get('/products', function () {
    return Inertia::render('products/index');
})->name('products.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin product management
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('products', ProductController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
