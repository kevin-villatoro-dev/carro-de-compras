import { Link } from 'react-router-dom'
import { useCartStore, useCartTotal, useCartCount } from '@/features/cart/store/cartStore'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/api'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = useCartTotal()
  const count = useCartCount()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="text-center py-20 animate-fade-in">
          <p className="text-5xl mb-4">🛒</p>
          <h1 className="font-display text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Carrito vacío
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-slate)' }}>
            Agrega productos para comenzar
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ background: 'var(--color-ember)', color: '#fff' }}
          >
            <ShoppingBag className="h-4 w-4" />
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Carrito
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>
            {count} producto{count !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm font-medium transition-colors"
          style={{ color: 'var(--color-crimson)' }}
        >
          Vaciar
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl p-4 sm:p-5 flex gap-4 animate-fade-in-up"
              style={{ background: 'var(--color-paper)', animationDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-none overflow-hidden flex items-center justify-center" style={{ background: '#f5f5f4' }}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-2xl opacity-30">📦</span>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--color-ink)' }}>
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-none p-1 transition-colors"
                    style={{ color: '#d1d5db' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-crimson)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-sm font-bold mt-1 price-tag" style={{ color: 'var(--color-ink)' }}>
                  {formatPrice(item.price)}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center rounded-lg border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 hover:bg-gray-50 transition-colors"
                      style={{ color: 'var(--color-slate)' }}
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold min-w-[2rem] text-center" style={{ color: 'var(--color-ink)' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-2.5 py-1 hover:bg-gray-50 transition-colors disabled:opacity-30"
                      style={{ color: 'var(--color-slate)' }}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold price-tag" style={{ color: 'var(--color-ink)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--color-ember)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Seguir comprando
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl p-6 sticky top-24" style={{ background: 'var(--color-paper)' }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-slate)' }}>
              Resumen
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between" style={{ color: 'var(--color-slate)' }}>
                <span>Subtotal</span>
                <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between" style={{ color: 'var(--color-slate)' }}>
                <span>Envío</span>
                <span className="font-semibold" style={{ color: 'var(--color-sage)' }}>Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-bold" style={{ color: 'var(--color-ink)' }}>Total</span>
                <span className="font-bold text-lg price-tag" style={{ color: 'var(--color-ink)' }}>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full mt-6 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: 'var(--color-ember)', color: '#fff' }}
            >
              Pagar
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="text-center text-[11px] mt-3" style={{ color: 'var(--color-slate)' }}>
              Pago seguro y encriptado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
