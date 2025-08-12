<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of active products for public view.
     */
    public function index()
    {
        $products = Product::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }
}
