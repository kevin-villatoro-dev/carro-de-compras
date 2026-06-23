import { useInView } from '@/shared/hooks/useAnimations'
import { Truck, Shield, CreditCard, Headphones, RefreshCcw, Zap } from 'lucide-react'

const features = [
  { icon: Truck, title: 'Envío Gratis', desc: 'En compras +$99', color: 'text-blue-500' },
  { icon: Shield, title: 'Compra Segura', desc: 'Pago 100% seguro', color: 'text-emerald-500' },
  { icon: CreditCard, title: 'Múltiples Pagos', desc: 'Tarjeta, efectivo, transferencia', color: 'text-purple-500' },
  { icon: Headphones, title: 'Soporte 24/7', desc: 'Estamos para ayudarte', color: 'text-orange-500' },
  { icon: RefreshCcw, title: 'Devoluciones', desc: '30 días de garantía', color: 'text-rose-500' },
  { icon: Zap, title: 'Envío Express', desc: 'Recibe hoy mismo', color: 'text-amber-500' },
]

export function FeaturesGrid() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {features.map((feat, i) => (
        <div
          key={feat.title}
          className={`text-center p-4 rounded-xl bg-white border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <feat.icon className={`h-8 w-8 mx-auto mb-2 ${feat.color}`} />
          <h4 className="font-semibold text-sm text-text">{feat.title}</h4>
          <p className="text-xs text-text-muted mt-1">{feat.desc}</p>
        </div>
      ))}
    </div>
  )
}
