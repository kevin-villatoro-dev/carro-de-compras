import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/shared/components/Layout'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'

const Home = lazy(() => import('@/pages/Home'))
const Products = lazy(() => import('@/pages/Products'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ember" />
    </div>
  )
}

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="font-display text-4xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-ink)' }}>
        404
      </h1>
      <p className="text-lg mb-6" style={{ color: 'var(--color-slate)' }}>
        Esta página no existe
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
        style={{ background: 'var(--color-ember)', color: '#fff' }}
      >
        Volver al inicio
      </a>
    </div>
  )
}

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}
