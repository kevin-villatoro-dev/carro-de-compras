import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartCount } from '@/features/cart/store/cartStore'
import { useState } from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const itemCount = useCartCount()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/products', label: 'Productos' },
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-parchment)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ background: 'var(--color-paper)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
                Shop<span style={{ color: 'var(--color-ember)' }}>Cart</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
                  style={{
                    color: location.pathname === link.to ? 'var(--color-ember)' : 'var(--color-slate)',
                    background: location.pathname === link.to ? 'rgba(232, 93, 4, 0.06)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-slate)' }}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    style={{ background: 'var(--color-ember)' }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="sm:hidden p-2 rounded-lg"
                style={{ color: 'var(--color-slate)' }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="sm:hidden border-t animate-slide-down" style={{ borderColor: 'var(--color-border)', background: 'var(--color-paper)' }}>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: location.pathname === link.to ? 'var(--color-ember)' : 'var(--color-slate)',
                    background: location.pathname === link.to ? 'rgba(232, 93, 4, 0.06)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto" style={{ background: 'var(--color-ink)', borderColor: 'var(--color-ink)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <span className="font-display text-lg font-bold" style={{ color: '#fff' }}>
                Shop<span style={{ color: 'var(--color-ember)' }}>Cart</span>
              </span>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                Tu tienda de confianza. Productos curados, precios honestos.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>Tienda</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#d1d5db' }}>
                <li><Link to="/products" className="hover:text-white transition-colors">Todos los Productos</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Ofertas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9ca3af' }}>Contacto</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#d1d5db' }}>
                <li>soporte@shopcart.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-xs" style={{ borderColor: '#333', color: '#6b7280' }}>
            © 2026 ShopCart
          </div>
        </div>
      </footer>
    </div>
  )
}
