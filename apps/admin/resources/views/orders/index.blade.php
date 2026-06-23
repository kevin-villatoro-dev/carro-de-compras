@extends('layouts.app')

@section('title', 'Órdenes')
@section('header', 'Órdenes')

@section('content')
<div class="action-bar">
    <form method="GET" class="action-bar-form">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar por ID o usuario..." class="filter-input" style="width: 220px;">
        <select name="status" class="filter-input">
            <option value="">Todos los estados</option>
            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pendiente</option>
            <option value="processing" {{ request('status') == 'processing' ? 'selected' : '' }}>Procesando</option>
            <option value="shipped" {{ request('status') == 'shipped' ? 'selected' : '' }}>Enviado</option>
            <option value="delivered" {{ request('status') == 'delivered' ? 'selected' : '' }}>Entregado</option>
            <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Cancelado</option>
        </select>
        <button type="submit" class="btn btn-outline btn-sm">Filtrar</button>
        @if(request()->hasAny(['search', 'status']))
            <a href="{{ route('orders.index') }}" class="btn btn-ghost btn-sm">Limpiar</a>
        @endif
    </form>
</div>

<div class="card">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th style="width: 60px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($orders as $order)
                    <tr>
                        <td><code style="font-size: 0.8125rem; background: var(--parchment); padding: 0.125rem 0.375rem; border-radius: 4px;">#{{ substr($order->id, 0, 8) }}</code></td>
                        <td>{{ $order->user_id }}</td>
                        <td style="font-weight: 600;">${{ number_format($order->total, 2) }}</td>
                        <td>
                            <span class="badge badge-{{ $order->status_color }}">
                                <span class="badge-dot"></span>
                                {{ ucfirst($order->status) }}
                            </span>
                        </td>
                        <td style="color: var(--slate);">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                        <td>
                            <a href="{{ route('orders.show', $order) }}" class="btn btn-ghost" title="Ver detalle">
                                <i class="fas fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">
                            <div class="empty-state">
                                <i class="fas fa-shopping-bag"></i>
                                <p>No hay órdenes registradas.</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

{{ $orders->withQueryString()->links() }}
@endsection
