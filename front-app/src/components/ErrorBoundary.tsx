import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Poppins' }}>
              Algo salió mal
            </h2>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Poppins' }}>
              Ocurrió un error inesperado. Por favor, intenta nuevamente.
            </p>
            <button
              className="bg-teal-900 hover:bg-teal-800 text-white font-bold py-2 px-6 rounded-full"
              style={{ fontFamily: 'Poppins' }}
              onClick={() => window.location.reload()}
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;