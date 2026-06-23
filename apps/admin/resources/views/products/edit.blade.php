@extends('layouts.app')

@section('title', 'Editar Producto')
@section('header', 'Editar: ' . $product->name)

@section('content')
<div style="max-width: 720px;">
    <form action="{{ route('products.update', $product) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label class="form-label">Nombre *</label>
                    <input type="text" name="name" value="{{ old('name', $product->name) }}" class="form-input" required>
                    @error('name')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">Descripción</label>
                    <textarea name="description" rows="3" class="form-textarea">{{ old('description', $product->description) }}</textarea>
                    @error('description')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Precio *</label>
                        <input type="number" name="price" value="{{ old('price', $product->price) }}" step="0.01" min="0" class="form-input" required>
                        @error('price')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label class="form-label">Precio de comparación</label>
                        <input type="number" name="compare_at_price" value="{{ old('compare_at_price', $product->compare_at_price) }}" step="0.01" min="0" class="form-input">
                        @error('compare_at_price')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">SKU *</label>
                        <input type="text" name="sku" value="{{ old('sku', $product->sku) }}" class="form-input" required>
                        @error('sku')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label class="form-label">Stock *</label>
                        <input type="number" name="stock" value="{{ old('stock', $product->stock) }}" min="0" class="form-input" required>
                        @error('stock')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Marca</label>
                        <select name="brand_id" class="form-select">
                            <option value="">Seleccionar marca</option>
                            @foreach($brands as $brand)
                                <option value="{{ $brand->id }}" {{ old('brand_id', $product->brand_id) == $brand->id ? 'selected' : '' }}>{{ $brand->name }}</option>
                            @endforeach
                        </select>
                        @error('brand_id')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="form-group">
                        <label class="form-label">Categoría</label>
                        <select name="category_id" class="form-select">
                            <option value="">Seleccionar categoría</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                            @endforeach
                        </select>
                        @error('category_id')
                            <div class="form-error">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">URLs de imágenes (una por línea)</label>
                    <textarea name="images_textarea" rows="3" class="form-textarea" placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg">{{ is_array($product->images) ? implode("\n", $product->images) : '' }}</textarea>
                    <input type="hidden" name="images" id="images_hidden">
                    @error('images')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <div class="form-check">
                        <input type="checkbox" name="is_active" value="1" id="is_active" {{ old('is_active', $product->is_active) ? 'checked' : '' }}>
                        <label for="is_active" style="font-size: 0.875rem; color: var(--ink);">Producto activo</label>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <a href="{{ route('products.index') }}" class="btn btn-outline">Cancelar</a>
            <button type="submit" class="btn btn-ember">Actualizar Producto</button>
        </div>
    </form>
</div>

<script>
document.querySelector('form').addEventListener('submit', function() {
    const textarea = document.querySelector('textarea[name="images_textarea"]');
    const hidden = document.getElementById('images_hidden');
    const urls = textarea.value.split('\n').map(u => u.trim()).filter(u => u.length > 0);
    hidden.value = JSON.stringify(urls);
});
</script>
@endsection
