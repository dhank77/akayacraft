<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;

Route::get('/products', function () {
    return Product::where('is_active', true)->orderBy('created_at', 'desc')->get();
});