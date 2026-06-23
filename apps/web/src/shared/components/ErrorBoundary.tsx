import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>
              <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-crimson)' }} />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--color-ink)' }}>
              Algo salió mal
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-slate)' }}>
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
              style={{ background: 'var(--color-ink)', color: '#fff' }}
            >
              <RefreshCw className="h-4 w-4" />
              Recargar página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}