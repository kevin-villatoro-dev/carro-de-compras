<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use App\Models\Brand;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products' => Product::count(),
            'categories' => Category::count(),
            'brands' => Brand::count(),
            'orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'low_stock' => Product::where('stock', '<', 10)->count(),
        ];

        $recentOrders = Order::latest()->take(5)->get();
        $lowStockProducts = Product::where('stock', '<', 10)
            ->with(['brand', 'category'])
            ->take(5)
            ->get();

        return view('dashboard', compact('stats', 'recentOrders', 'lowStockProducts'));
    }
}
