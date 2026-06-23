import { useState } from 'react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useBrands } from '@/features/brands/hooks/useBrands'
import { ProductCard } from '@/shared/components/ProductCard'
import { Search, X } from 'lucide-react'

export default function Products() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const { data: products, isLoading, error } = useProducts({
    search: search || undefined,
    category: selectedCategory || undefined,
    brand: selectedBrand || undefined,
  })

  const { data: categories } = useCategories()
  const { data: brands } = useBrands()

  const hasFilters = selectedCategory || selectedBrand

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-ember)' }}>
          Catálogo
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
          Productos
        </h1>
        {products && (
          <p className="mt-1 text-sm" style={{ color: 'var(--color-slate)' }}>
            {products.length} resultado{products.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-slate)' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-shadow"
            style={{
              borderColor: 'var(--color-border)',
              background: 'var(--color-paper)',
              color: 'var(--color-ink)',
              '--tw-ring-color': 'var(--color-ember)',
            } as React.CSSProperties}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-slate)' }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-paper)',
            color: selectedCategory ? 'var(--color-ink)' : 'var(--color-slate)',
          }}
        >
          <option value="">Categorías</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-paper)',
            color: selectedBrand ? 'var(--color-ink)' : 'var(--color-slate)',
          }}
        >
          <option value="">Marcas</option>
          {brands?.map((brand) => (
            <option key={brand.id} value={brand.slug}>{brand.name}</option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setSelectedCategory(''); setSelectedBrand('') }}
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--color-ember)' }}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Products */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden animate-pulse" style={{ background: 'var(--color-paper)' }}>
              <div className="aspect-square" style={{ background: '#f0f0f0' }} />
              <div className="p-4 space-y-2">
                <div className="h-3 rounded w-1/3" style={{ background: '#e5e5e5' }} />
                <div className="h-4 rounded w-3/4" style={{ background: '#e5e5e5' }} />
                <div className="h-4 rounded w-1/2" style={{ background: '#e5e5e5' }} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 rounded-xl" style={{ background: 'var(--color-paper)' }}>
          <p className="font-medium" style={{ color: 'var(--color-crimson)' }}>Error al cargar productos</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>Verifica que la API esté corriendo</p>
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl" style={{ background: 'var(--color-paper)' }}>
          <p className="text-lg font-medium" style={{ color: 'var(--color-ink)' }}>Sin resultados</p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>Prueba con otros filtros</p>
        </div>
      )}
    </div>
  )
}
