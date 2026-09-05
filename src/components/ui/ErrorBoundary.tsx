import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('L\'ÉLIXIR Atelier Uncaught Error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.hash = '#/';
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-accent/30 selection:text-foreground">
          <div className="max-w-md w-full bg-card border border-border/80 rounded-2xl p-8 text-center shadow-floating space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <p className="font-serif italic text-accent text-sm tracking-widest uppercase">
                L'ÉLIXIR Atelier
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Beklenmeyen Bir Durum Oluştu
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                Deneyiminizi kusursuz tutmak için sayfayı yenileyebilir veya ana sayfaya dönebilirsiniz.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-dark-light font-medium py-3 px-4 rounded-xl transition-colors text-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Sayfayı Yenile
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-surface border border-border hover:border-accent text-foreground font-medium py-3 px-4 rounded-xl transition-colors text-sm cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
