@extends('layouts.app')

@section('title', 'Marcas')
@section('header', 'Marcas')

@section('header-actions')
    <a href="{{ route('brands.create') }}" class="btn btn-ember">
        <i class="fas fa-plus"></i> Nueva Marca
    </a>
@endsection

@section('content')
<div class="card">
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Slug</th>
                    <th>Productos</th>
                    <th style="width: 100px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($brands as $brand)
                    <tr>
                        <td style="font-weight: 600;">{{ $brand->name }}</td>
                        <td><code style="font-size: 0.8125rem; background: var(--parchment); padding: 0.125rem 0.375rem; border-radius: 4px;">{{ $brand->slug }}</code></td>
                        <td><span class="badge badge-secondary">{{ $brand->products_count }}</span></td>
                        <td>
                            <div class="inline-actions">
                                <a href="{{ route('brands.edit', $brand) }}" class="btn btn-ghost" title="Editar">
                                    <i class="fas fa-pen"></i>
                                </a>
                                <form action="{{ route('brands.destroy', $brand) }}" method="POST" onsubmit="return confirm('¿Eliminar esta marca?')">
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
                        <td colspan="4">
                            <div class="empty-state">
                                <i class="fas fa-building"></i>
                                <p>No hay marcas registradas.</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

{{ $brands->links() }}
@endsection
