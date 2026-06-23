import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  title: string
  subtitle: string
  cta: string
  gradient: string
  emoji: string
}

const slides: Slide[] = [
  {
    title: 'Nueva Colección',
    subtitle: 'Descubre los últimos productos de temporada con descuentos exclusivos.',
    cta: 'Explorar Ahora',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    emoji: '🛍️',
  },
  {
    title: 'Ofertas Imperdibles',
    subtitle: 'Hasta 50% de descuento en productos seleccionados. ¡No te lo pierdas!',
    cta: 'Ver Ofertas',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    emoji: '🔥',
  },
  {
    title: 'Envío Gratis',
    subtitle: 'En compras superiores a $99. Recibe tu pedido en la puerta de tu casa.',
    cta: 'Comprar Ahora',
    gradient: 'from-purple-600 via-violet-700 to-fuchsia-800',
    emoji: '🚚',
  },
  {
    title: 'Marcas Premium',
    subtitle: 'Las mejores marcas del mercado, seleccionadas para ti.',
    cta: 'Descubrir Marcas',
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    emoji: '⭐',
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const slide = slides[current]!

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className={`bg-gradient-to-r ${slide.gradient} transition-all duration-700 ease-in-out`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-white text-center md:text-left">
              <h2
                key={`title-${current}`}
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up"
              >
                {slide.title}
              </h2>
              <p
                key={`sub-${current}`}
                className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg animate-fade-in-up delay-2"
              >
                {slide.subtitle}
              </p>
              <Link
                to="/products"
                key={`cta-${current}`}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105 animate-fade-in-up delay-4"
              >
                {slide.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div
              key={`emoji-${current}`}
              className="text-7xl sm:text-8xl md:text-9xl animate-fade-in select-none"
            >
              {slide.emoji}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
