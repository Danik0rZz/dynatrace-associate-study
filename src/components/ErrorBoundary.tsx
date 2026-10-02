import { Component, type ReactNode } from 'react'

type Props = { fallback: (retry: () => void) => ReactNode; children: ReactNode }
type State = { failed: boolean }

/**
 * Evita que un fallo al descargar una parte diferida (sin conexión, o tras publicar una versión nueva)
 * deje la app en blanco: muestra un aviso en su lugar.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  retry = () => this.setState({ failed: false })

  render() {
    return this.state.failed ? this.props.fallback(this.retry) : this.props.children
  }
}
