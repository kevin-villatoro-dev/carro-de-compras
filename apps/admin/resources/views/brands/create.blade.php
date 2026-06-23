@extends('layouts.app')

@section('title', 'Nueva Marca')
@section('header', 'Crear Marca')

@section('content')
<div style="max-width: 720px;">
    <form action="{{ route('brands.store') }}" method="POST">
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
                    <label class="form-label">URL del logo</label>
                    <input type="url" name="logo" value="{{ old('logo') }}" class="form-input" placeholder="https://...">
                    @error('logo')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <a href="{{ route('brands.index') }}" class="btn btn-outline">Cancelar</a>
            <button type="submit" class="btn btn-ember">Guardar Marca</button>
        </div>
    </form>
</div>
@endsection
