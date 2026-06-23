@extends('layouts.app')

@section('title', 'Orden #' . substr($order->id, 0, 8))
@section('header', 'Detalle de Orden')

@section('content')
<div style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem;">
    <!-- Order Info + Items -->
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div class="card">
            <div class="card-header">
                <span class="card-title">Información de la Orden</span>
            </div>
            <div class="card-body">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">ID de Orden</div>
                        <div style="font-family: monospace; font-size: 0.875rem;">{{ $order->id }}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Usuario</div>
                        <div>{{ $order->user_id }}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Fecha</div>
                        <div>{{ $order->created_at->format('d/m/Y H:i') }}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">Dirección de envío</div>
                        <div>{{ $order->shipping_address ?? 'No especificada' }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Productos</span>
                <span class="badge badge-secondary">{{ $order->items->count() }} items</span>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th style="text-align: right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($order->items as $item)
                            <tr>
                                <td style="font-weight: 500;">{{ $item->product?->name ?? 'Producto eliminado' }}</td>
                                <td>${{ number_format($item->price, 2) }}</td>
                                <td>{{ $item->quantity }}</td>
                                <td style="text-align: right; font-weight: 600;">${{ number_format($item->price * $item->quantity, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="font-weight: 600; border-top: 2px solid var(--border);">Total</td>
                            <td style="text-align: right; font-weight: 700; font-size: 1.125rem; border-top: 2px solid var(--border);">${{ number_format($order->total, 2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- Status Update -->
    <div>
        <div class="card">
            <div class="card-header">
                <span class="card-title">Actualizar Estado</span>
            </div>
            <div class="card-body">
                <div style="margin-bottom: 1rem;">
                    <div style="font-size: 0.75rem; font-weight: 600; color: var(--slate); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.375rem;">Estado actual</div>
                    <span class="badge badge-{{ $order->status_color }}" style="font-size: 0.875rem;">
                        <span class="badge-dot"></span>
                        {{ ucfirst($order->status) }}
                    </span>
                </div>

                <form action="{{ route('orders.updateStatus', $order) }}" method="POST">
                    @csrf
                    @method('PATCH')
                    <div class="form-group">
                        <label class="form-label">Nuevo estado</label>
                        <select name="status" class="form-select">
                            <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pendiente</option>
                            <option value="processing" {{ $order->status == 'processing' ? 'selected' : '' }}>Procesando</option>
                            <option value="shipped" {{ $order->status == 'shipped' ? 'selected' : '' }}>Enviado</option>
                            <option value="delivered" {{ $order->status == 'delivered' ? 'selected' : '' }}>Entregado</option>
                            <option value="cancelled" {{ $order->status == 'cancelled' ? 'selected' : '' }}>Cancelado</option>
                        </select>
                        @error('status')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                    <button type="submit" class="btn btn-ember" style="width: 100%;">
                        Actualizar Estado
                    </button>
                </form>
            </div>
        </div>

        <a href="{{ route('orders.index') }}" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1rem; padding: 0.75rem; font-size: 0.875rem; font-weight: 500; color: var(--slate); text-decoration: none; border-radius: 8px; transition: background 0.15s ease;" onmouseover="this.style.background='var(--paper)'" onmouseout="this.style.background='transparent'">
            <i class="fas fa-arrow-left"></i> Volver a órdenes
        </a>
    </div>
</div>
@endsection
