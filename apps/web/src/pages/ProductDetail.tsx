import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/features/products/hooks/useProducts'
import { useCartStore } from '@/features/cart/store/cartStore'
import { calcDiscount } from '@/lib/api'
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, error } = useProduct(slug || '')
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        stock: product.stock,
        image: product.images?.[0],
      })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 animate-pulse">
        <div className="h-6 rounded w-32 mb-10" style={{ background: 'var(--color-border)' }} />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl" style={{ background: 'var(--color-border)' }} />
          <div className="space-y-4">
            <div className="h-4 rounded w-24" style={{ background: 'var(--color-border)' }} />
            <div className="h-8 rounded w-3/4" style={{ background: 'var(--color-border)' }} />
            <div className="h-10 rounded w-1/3" style={{ background: 'var(--color-border)' }} />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="text-center py-16 rounded-2xl" style={{ background: 'var(--color-paper)' }}>
          <p className="font-medium" style={{ color: 'var(--color-ink)' }}>
            {error ? 'Error al cargar el producto' : 'Producto no encontrado'}
          </p>
          <Link to="/products" className="text-sm mt-2 inline-block font-medium" style={{ color: 'var(--color-ember)' }}>
            Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.compareAtPrice
    ? calcDiscount(product.price, product.compareAtPrice)
    : 0

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 animate-fade-in">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors"
        style={{ color: 'var(--color-slate)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Productos
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center" style={{ background: 'var(--color-surface)' }}>
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl opacity-20">📦</span>
          )}
          {discount > 0 && (
            <span
              className="absolute top-4 left-4 text-white text-sm font-bold px-3 py-1 rounded"
              style={{ background: 'var(--color-crimson)' }}
            >
              −{discount}%
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-ember)' }}>
              {product.brand.name}
            </p>
          )}

          <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            {product.name}
          </h1>

          {product.category && (
            <span
              className="inline-block mt-2 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded w-fit"
              style={{ background: 'rgba(232, 93, 4, 0.06)', color: 'var(--color-ember)' }}
            >
              {product.category.name}
            </span>
          )}

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold price-tag" style={{ color: 'var(--color-ink)' }}>
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg line-through" style={{ color: 'var(--color-slate)' }}>
                  ${product.compareAtPrice}
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-crimson)' }}>
                  Ahorras ${(parseFloat(product.compareAtPrice) - parseFloat(product.price)).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-4 flex items-center gap-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded"
              style={{
                background: product.stock > 0
                  ? product.stock < 10 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(5, 150, 105, 0.1)'
                  : 'rgba(220, 38, 38, 0.1)',
                color: product.stock > 0
                  ? product.stock < 10 ? '#d97706' : 'var(--color-sage)'
                  : 'var(--color-crimson)',
              }}
            >
              {product.stock > 0
                ? product.stock < 10 ? `¡Solo quedan ${product.stock}!` : `${product.stock} unidades`
                : 'Agotado'}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-slate)' }}>SKU: {product.sku}</span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-slate)' }}>
                Descripción
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>
                {product.description}
              </p>
            </div>
          )}

          {/* Add to cart */}
          {product.stock > 0 && (
            <div className="mt-auto pt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>Cantidad</span>
                <div className="flex items-center rounded-lg border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 transition-colors"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold min-w-[2.5rem] text-center" style={{ color: 'var(--color-ink)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 transition-colors"
                    style={{ color: 'var(--color-slate)' }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: 'var(--color-ember)', color: '#fff' }}
              >
                <ShoppingCart className="h-4 w-4" />
                Agregar — ${(parseFloat(product.price) * quantity).toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
