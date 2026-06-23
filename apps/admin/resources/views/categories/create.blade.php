@extends('layouts.app')

@section('title', 'Nueva Categoría')
@section('header', 'Crear Categoría')

@section('content')
<div style="max-width: 720px;">
    <form action="{{ route('categories.store') }}" method="POST">
        @csrf
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label class="form-label">Nombre *</label>
                    <input type="text" name="name" value="{{ old('name') }}" class="form-input" required autofocus>
                    @error('name')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea name="description" rows="3" class="form-textarea">{{ old('description') }}</textarea>
                    @error('description')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">Categoría padre</label>
                    <select name="parent_id" class="form-select">
                        <option value="">Sin categoría padre</option>
                        @foreach($parentCategories as $category)
                            <option value="{{ $category->id }}" {{ old('parent_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                        @endforeach
                    </select>
                    @error('parent_id')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">URL de imagen</label>
                    <input type="url" name="image" value="{{ old('image') }}" class="form-input" placeholder="https://...">
                    @error('image')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <a href="{{ route('categories.index') }}" class="btn btn-outline">Cancelar</a>
            <button type="submit" class="btn btn-ember">Guardar Categoría</button>
        </div>
    </form>
</div>
@endsection
