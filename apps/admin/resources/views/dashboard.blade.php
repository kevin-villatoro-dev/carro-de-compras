@extends('layouts.app')

@section('title', 'Dashboard')
@section('header', 'Dashboard')

@section('content')
<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-icon ember"><i class="fas fa-box"></i></div>
        <div>
            <div class="stat-value">{{ $stats['products'] }}</div>
            <div class="stat-label">Productos</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon sage"><i class="fas fa-tags"></i></div>
        <div>
            <div class="stat-value">{{ $stats['categories'] }}</div>
            <div class="stat-label">Categorías</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon purple"><i class="fas fa-building"></i></div>
        <div>
            <div class="stat-value">{{ $stats['brands'] }}</div>
            <div class="stat-label">Marcas</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon blue"><i class="fas fa-shopping-bag"></i></div>
        <div>
            <div class="stat-value">{{ $stats['orders'] }}</div>
            <div class="stat-label">Órdenes</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon amber"><i class="fas fa-clock"></i></div>
        <div>
            <div class="stat-value">{{ $stats['pending_orders'] }}</div>
            <div class="stat-label">Pendientes</div>
        </div>
    </div>
    <div class="stat-card">
        <div class="stat-icon crimson"><i class="fas fa-exclamation-triangle"></i></div>
        <div>
            <div class="stat-value">{{ $stats['low_stock'] }}</div>
            <div class="stat-label">Stock Bajo</div>
        </div>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <!-- Recent Orders -->
    <div class="card">
        <div class="card-header">
            <span class="card-title">Órdenes Recientes</span>
            <a href="{{ route('orders.index') }}" class="btn btn-outline btn-sm">Ver todas</a>
        </div>
        <div class="card-body">
            @if($recentOrders->isEmpty())
                <div class="empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <p>No hay órdenes recientes.</p>
                </div>
            @else
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    @foreach($recentOrders as $order)
                        <a href="{{ route('orders.show', $order) }}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: 8px; text-decoration: none; color: inherit; transition: background 0.15s ease;" onmouseover="this.style.background='var(--parchment)'" onmouseout="this.style.background='transparent'">
                            <div>
                                <div style="font-weight: 600; font-size: 0.875rem;">#{{ substr($order->id, 0, 8) }}</div>
                                <div style="font-size: 0.8125rem; color: var(--slate);">{{ $order->created_at->format('d/m/Y H:i') }}</div>
                            </div>
                            <div style="text-align: right;">
                                <span class="badge badge-{{ $order->status_color }}">
                                    <span class="badge-dot"></span>
                                    {{ ucfirst($order->status) }}
                                </span>
                                <div style="font-weight: 600; font-size: 0.875rem; margin-top: 0.25rem;">${{ number_format($order->total, 2) }}</div>
                            </div>
                        </a>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    <!-- Low Stock Products -->
    <div class="card">
        <div class="card-header">
            <span class="card-title">Stock Bajo</span>
            <a href="{{ route('products.index') }}" class="btn btn-outline btn-sm">Ver productos</a>
        </div>
        <div class="card-body">
            @if($lowStockProducts->isEmpty())
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>Todos los productos tienen stock suficiente.</p>
                </div>
            @else
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    @foreach($lowStockProducts as $product)
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; font-size: 0.875rem;">{{ $product->name }}</div>
                                <div style="font-size: 0.8125rem; color: var(--slate);">{{ $product->brand?->name ?? 'Sin marca' }}</div>
                            </div>
                            <span class="badge {{ $product->stock == 0 ? 'badge-danger' : 'badge-warning' }}">
                                {{ $product->stock }} unidades
                            </span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
