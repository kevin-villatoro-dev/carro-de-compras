import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '@/features/products/hooks/useProducts'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useInView } from '@/shared/hooks/useAnimations'
import { ProductCard } from '@/shared/components/ProductCard'

export default function Home() {
  const { data: products } = useProducts({})
  const { data: categories } = useCategories()

  const featured = products?.filter((p) => p.stock > 0).slice(0, 4) || []
  const onSale = products?.filter((p) => p.compareAtPrice && p.stock > 0).slice(0, 4) || []

  return (
    <div>
      {/* Hero — the thesis: discovery */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Hero />
      </section>

      {/* Featured — editorial grid */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <SectionHeader
            eyebrow="Destacados"
            title="Lo que está causando sensación"
            linkTo="/products"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Categories — clean list */}
      {categories && categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <SectionHeader
            eyebrow="Categorías"
            title="Explora por tipo"
            linkTo="/products"
          />
          <CategoryList categories={categories} />
        </section>
      )}

      {/* On sale */}
      {onSale.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
          <SectionHeader
            eyebrow="Ofertas"
            title="Precios que no van a durar"
            linkTo="/products"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {onSale.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Trust strip */}
      <section className="border-y" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <TrustStrip />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <CtaBlock />
      </section>
    </div>
  )
}

/* ---------- Sub-components ---------- */

function Hero() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className={isInView ? 'animate-fade-in-up' : 'opacity-0'}>
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'var(--color-ember)' }}
      >
        Tienda Curada
      </p>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-2xl" style={{ color: 'var(--color-ink)' }}>
        Encuentra tu próximo
        <br />
        <span style={{ color: 'var(--color-ember)' }}>favorito</span>
      </h1>
      <p className="mt-5 text-lg max-w-lg leading-relaxed" style={{ color: 'var(--color-slate)' }}>
        Productos seleccionados a mano, precios honestos, y la confianza de saber exactamente lo que estás comprando.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
          style={{ background: 'var(--color-ember)' }}
        >
          Explorar Productos
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border transition-colors"
          style={{ color: 'var(--color-ink)', borderColor: 'var(--color-border)' }}
        >
          Ver Ofertas
        </Link>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, linkTo }: { eyebrow: string; title: string; linkTo: string }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`flex items-end justify-between mb-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--color-ember)' }}>
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
          {title}
        </h2>
      </div>
      <Link
        to={linkTo}
        className="text-sm font-medium hidden sm:inline-flex items-center gap-1 transition-colors"
        style={{ color: 'var(--color-ember)' }}
      >
        Ver todo
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

function CategoryList({ categories }: { categories: { id: string; name: string; slug: string }[] }) {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="flex flex-wrap gap-3">
      {categories.map((cat, i) => (
        <Link
          key={cat.id}
          to={`/products?category=${cat.slug}`}
          className={`category-pill px-5 py-2.5 rounded-full text-sm font-medium ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}

function TrustStrip() {
  const items = [
    { icon: '→', label: 'Envío gratis en compras +$99' },
    { icon: '↺', label: '30 días para devolver' },
    { icon: '◈', label: 'Pago 100% seguro' },
    { icon: '◉', label: 'Stock actualizado en tiempo real' },
  ]

  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex items-start gap-3 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="text-lg mt-0.5" style={{ color: 'var(--color-ember)' }}>{item.icon}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-slate)' }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function CtaBlock() {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`text-center py-12 px-6 rounded-2xl ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ background: 'var(--color-ink)' }}
    >
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
        ¿Listo para empezar?
      </h2>
      <p className="mt-3 text-base max-w-md mx-auto" style={{ color: '#9ca3af' }}>
        Explora nuestro catálogo completo y encuentra lo que necesitas.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 mt-8 px-8 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
        style={{ background: 'var(--color-ember)', color: '#fff' }}
      >
        Ver Productos
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
