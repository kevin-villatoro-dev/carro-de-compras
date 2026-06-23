import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useCartStore, useCartTotal, useCartCount, useClearCart } from '@/features/cart/store/cartStore'
import { api, formatPrice, type CheckoutInput } from '@/lib/api'
import { ArrowLeft, Lock, CreditCard, Truck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function Checkout() {
  const items = useCartStore((state) => state.items)
  const total = useCartTotal()
  const count = useCartCount()
  const clearCart = useClearCart()
  
  const [shippingAddress, setShippingAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'paypal'>('credit_card')
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null)
  
  const checkoutMutation = useMutation({
    mutationFn: (input: CheckoutInput) => api.orders.checkout(input),
    onSuccess: (data) => {
      setOrderSuccess(data.orderId)
      clearCart()
    },
  })

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="text-center py-20 animate-fade-in">
          <p className="text-5xl mb-4">🛒</p>
          <h1 className="font-display text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Carrito vacío
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-slate)' }}>
            Agrega productos antes de continuar
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ background: 'var(--color-ember)', color: '#fff' }}
          >
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 animate-fade-in">
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: 'rgba(5, 150, 105, 0.08)' }}>
            <CheckCircle className="h-10 w-10" style={{ color: 'var(--color-sage)' }} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            ¡Pedido confirmado!
          </h1>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: 'var(--color-slate)' }}>
            Tu pedido <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>#{orderSuccess.slice(0, 8)}</span> ha sido recibido y está siendo procesado.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'rgba(5, 150, 105, 0.08)', color: 'var(--color-sage)' }}>
            <Truck className="h-3.5 w-3.5" />
            Recibirás un correo con los detalles del envío
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
              style={{ background: 'var(--color-ink)', color: '#fff' }}
            >
              Seguir comprando
            </Link>
            <Link
              to="/"
              className="px-6 py-3 text-sm font-semibold rounded-lg transition-all"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    
    checkoutMutation.mutate({
      userId: 'guest-' + Date.now(), // Simple guest user ID for now
      shippingAddress,
      paymentMethod,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 animate-fade-in">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-colors"
        style={{ color: 'var(--color-slate)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Address */}
            <div className="rounded-xl p-6" style={{ background: 'var(--color-paper)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(232, 93, 4, 0.08)' }}>
                  <Truck className="h-5 w-5" style={{ color: 'var(--color-ember)' }} />
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
                  Dirección de envío
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-ink)' }}>
                    Dirección completa
                  </label>
                  <textarea
                    id="address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Calle, número, colonia, ciudad, estado, código postal"
                    rows={3}
                    required
                    minLength={10}
                    className="w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2"
                    style={{
                      borderColor: 'var(--color-border)',
                      background: '#fff',
                      color: 'var(--color-ink)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl p-6" style={{ background: 'var(--color-paper)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(232, 93, 4, 0.08)' }}>
                  <CreditCard className="h-5 w-5" style={{ color: 'var(--color-ember)' }} />
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
                  Método de pago
                </h2>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'credit_card', label: 'Tarjeta de crédito', icon: '💳' },
                  { value: 'debit_card', label: 'Tarjeta de débito', icon: '💳' },
                  { value: 'paypal', label: 'PayPal', icon: '🅿️' },
                ].map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value as any)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      paymentMethod === method.value ? 'ring-2' : ''
                    }`}
                    style={{
                      borderColor: paymentMethod === method.value ? 'var(--color-ember)' : 'var(--color-border)',
                      background: paymentMethod === method.value ? 'rgba(232, 93, 4, 0.04)' : '#fff',
                      color: 'var(--color-ink)',
                    }}
                  >
                    <span className="text-2xl block mb-2">{method.icon}</span>
                    <span className="text-xs font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error message */}
            {checkoutMutation.isError && (
              <div className="rounded-lg p-4 flex items-start gap-3" style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <AlertCircle className="h-5 w-5 flex-none mt-0.5" style={{ color: '#ef4444' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#dc2626' }}>Error al procesar el pedido</p>
                  <p className="text-xs mt-1" style={{ color: '#991b1b' }}>{checkoutMutation.error.message}</p>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={checkoutMutation.isPending || !shippingAddress || shippingAddress.length < 10}
              className="w-full py-4 px-6 rounded-xl text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'var(--color-ink)',
                color: '#fff',
              }}
            >
              {checkoutMutation.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando pedido...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirmar pedido — {formatPrice(total)}
                </span>
              )}
            </button>

            {/* Security note */}
            <div className="text-center">
              <p className="text-xs" style={{ color: 'var(--color-slate)' }}>
                <Lock className="h-3 w-3 inline-block mr-1" />
                Pago 100% seguro. Tus datos están protegidos.
              </p>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl p-6 sticky top-24" style={{ background: 'var(--color-paper)' }}>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-slate)' }}>
              Resumen ({count} producto{count !== 1 ? 's' : ''})
            </h2>

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex-none overflow-hidden flex items-center justify-center" style={{ background: '#f5f5f4' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-sm opacity-30">📦</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-1" style={{ color: 'var(--color-ink)' }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--color-slate)' }}>x{item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold price-tag" style={{ color: 'var(--color-ink)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between" style={{ color: 'var(--color-slate)' }}>
                <span>Subtotal</span>
                <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between" style={{ color: 'var(--color-slate)' }}>
                <span>Envío</span>
                <span className="font-semibold" style={{ color: 'var(--color-sage)' }}>Gratis</span>
              </div>
              <div className="border-t pt-2 flex justify-between" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-bold" style={{ color: 'var(--color-ink)' }}>Total</span>
                <span className="font-bold text-lg price-tag" style={{ color: 'var(--color-ink)' }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
