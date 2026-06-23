@extends('layouts.app')

@section('title', 'Productos')
@section('header', 'Productos')

@section('header-actions')
    <a href="{{ route('products.create') }}" class="btn btn-ember">
        <i class="fas fa-plus"></i> Nuevo Producto
    </a>
@endsection

@section('content')
<div class="action-bar">
    <form method="GET" class="action-bar-form">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar por nombre o SKU..." class="filter-input" style="width: 220px;">
        <select name="category_id" class="filter-input">
            <option value="">Todas las categorías</option>
            @foreach($categories as $category)
                <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
            @endforeach
        </select>
        <select name="brand_id" class="filter-input">
            <option value="">Todas las marcas</option>
            @foreach($brands as $brand)
                <option value="{{ $brand->id }}" {{ request('brand_id') == $brand->id ? 'selected' : '' }}>{{ $brand->name }}</option>
            @endforeach
        </select>
        <button type="submit" class="btn btn-outline btn-sm">Filtrar</button>
        @if(request()->hasAny(['search', 'category_id', 'brand_id']))
            <a href="{{ route('products.index') }}" class="btn btn-ghost btn-sm">Limpiar</a>
        @endif
    </form>
</div>

<div class="card">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>SKU</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Estado</th>
                    <th style="width: 100px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($products as $product)
                    <tr>
                        <td>
                            <div style="font-weight: 600;">{{ $product->name }}</div>
                            @if($product->compare_at_price && $product->compare_at_price > $product->price)
                                <div style="font-size: 0.75rem; color: var(--slate); text-decoration: line-through;">${{ number_format($product->compare_at_price, 2) }}</div>
                            @endif
                        </td>
                        <td><code style="font-size: 0.8125rem; background: var(--parchment); padding: 0.125rem 0.375rem; border-radius: 4px;">{{ $product->sku }}</code></td>
                        <td style="font-weight: 600;">${{ number_format($product->price, 2) }}</td>
                        <td>
                            <span class="badge {{ $product->stock < 10 ? ($product->stock == 0 ? 'badge-danger' : 'badge-warning') : 'badge-success' }}">
                                {{ $product->stock }}
                            </span>
                        </td>
                        <td>{{ $product->category?->name ?? '—' }}</td>
                        <td>{{ $product->brand?->name ?? '—' }}</td>
                        <td>
                            <span class="badge {{ $product->is_active ? 'badge-success' : 'badge-secondary' }}">
                                {{ $product->is_active ? 'Activo' : 'Inactivo' }}
                            </span>
                        </td>
                        <td>
                            <div class="inline-actions">
                                <a href="{{ route('products.edit', $product) }}" class="btn btn-ghost" title="Editar">
                                    <i class="fas fa-pen"></i>
                                </a>
                                <form action="{{ route('products.destroy', $product) }}" method="POST" onsubmit="return confirm('¿Eliminar este producto?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger-ghost" title="Eliminar">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8">
                            <div class="empty-state">
                                <i class="fas fa-box"></i>
                                <p>No hay productos registrados.</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

{{ $products->withQueryString()->links() }}
@endsection
