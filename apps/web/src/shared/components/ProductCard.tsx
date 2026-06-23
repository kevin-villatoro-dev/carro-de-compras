import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/features/cart/store/cartStore'
import type { Product } from '@/lib/api'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const discount = product.compareAtPrice
    ? Math.round(
        ((parseFloat(product.compareAtPrice) - parseFloat(product.price)) /
          parseFloat(product.compareAtPrice)) *
          100
      )
    : 0

  return (
    <div
      className="card-shelf rounded-xl overflow-hidden animate-fade-in-up"
      style={{
        background: 'var(--color-paper)',
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-square flex items-center justify-center overflow-hidden" style={{ background: '#f5f5f4' }}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <span className="text-5xl opacity-30">📦</span>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span
            className="absolute top-3 left-3 text-white text-[11px] font-bold px-2 py-0.5 rounded"
            style={{ background: 'var(--color-crimson)' }}
          >
            −{discount}%
          </span>
        )}

        {/* Quick add */}
        {product.stock > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                stock: product.stock,
                image: product.images?.[0],
              })
            }}
            className="absolute bottom-3 right-3 p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
            style={{ background: 'var(--color-ember)' }}
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <Link to={`/products/${product.slug}`} className="block p-4">
        {/* Category eyebrow */}
        {product.category && (
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-ember)' }}>
            {product.category.name}
          </p>
        )}

        <h3
          className="text-sm font-semibold leading-snug line-clamp-2 transition-colors"
          style={{ color: 'var(--color-ink)' }}
        >
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate)' }}>{product.brand.name}</p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold price-tag" style={{ color: 'var(--color-ink)' }}>
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs line-through" style={{ color: 'var(--color-slate)' }}>
              ${product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-2">
          {product.stock > 0 ? (
            <span className="text-[11px] font-medium" style={{ color: 'var(--color-sage)' }}>
              En stock
            </span>
          ) : (
            <span className="text-[11px] font-medium" style={{ color: 'var(--color-crimson)' }}>
              Agotado
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
