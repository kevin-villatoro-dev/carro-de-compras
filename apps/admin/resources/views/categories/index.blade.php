@extends('layouts.app')

@section('title', 'Categorías')
@section('header', 'Categorías')

@section('header-actions')
    <a href="{{ route('categories.create') }}" class="btn btn-ember">
        <i class="fas fa-plus"></i> Nueva Categoría
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
                    <th>Padre</th>
                    <th>Productos</th>
                    <th style="width: 100px;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse($categories as $category)
                    <tr>
                        <td style="font-weight: 600;">{{ $category->name }}</td>
                        <td><code style="font-size: 0.8125rem; background: var(--parchment); padding: 0.125rem 0.375rem; border-radius: 4px;">{{ $category->slug }}</code></td>
                        <td>{{ $category->parent?->name ?? '—' }}</td>
                        <td><span class="badge badge-secondary">{{ $category->products_count }}</span></td>
                        <td>
                            <div class="inline-actions">
                                <a href="{{ route('categories.edit', $category) }}" class="btn btn-ghost" title="Editar">
                                    <i class="fas fa-pen"></i>
                                </a>
                                <form action="{{ route('categories.destroy', $category) }}" method="POST" onsubmit="return confirm('¿Eliminar esta categoría?')">
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
                        <td colspan="5">
                            <div class="empty-state">
                                <i class="fas fa-tags"></i>
                                <p>No hay categorías registradas.</p>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

{{ $categories->links() }}
@endsection
