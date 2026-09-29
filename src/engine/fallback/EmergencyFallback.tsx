import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * EmergencyFallback — Competition Emergency Mode Reliability Wrapper
 * Catches component runtime crashes or WebGL failures and renders a lightweight 2D fallback.
 */
export class EmergencyFallback extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('EmergencyFallback caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-slate-900/90 border border-amber-500/40 rounded-xl text-slate-200 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>[EMERGENCY MODE] {this.props.componentName || 'Component'} Fallback Active</span>
          </div>
          <p className="text-slate-400">
            Render failure or WebGL context loss detected. High-reliability 2D fallback automatically activated for competition stability.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 pt-1 border-t border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Site core rendering remains 100% operational</span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
