import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-linen)' }}>
          <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brick/10">
              <AlertTriangle className="w-8 h-8 text-brick" />
            </div>

            <div className="space-y-2">
              <h1
                className="text-2xl font-semibold text-ink"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Something went wrong
              </h1>
              <p className="text-slate text-sm leading-relaxed">
                We hit an unexpected error. Your data is safe. Try again or head back to the home page.
              </p>
            </div>

            {this.state.error && (
              <details className="mx-auto max-w-sm text-left">
                <summary className="cursor-pointer text-xs text-slate/70 hover:text-slate transition-colors">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 rounded-lg bg-ink/5 text-xs text-ink/70 overflow-x-auto whitespace-pre-wrap break-words">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber text-white text-sm font-medium hover:bg-amber-light transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
              <a
                href="/"
                className="px-5 py-2.5 rounded-lg border border-pebble text-sm font-medium text-ink hover:bg-pebble/30 transition-colors"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
