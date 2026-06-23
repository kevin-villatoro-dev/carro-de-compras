import { useInView } from '@/shared/hooks/useAnimations'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`mb-8 ${align === 'center' ? 'text-center' : ''} ${
        isInView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-text">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-text-muted text-lg">{subtitle}</p>
      )}
    </div>
  )
}
