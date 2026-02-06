"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * KISS: Minimal implementation, single responsibility
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught error:", error);
      console.error("Component stack:", errorInfo.componentStack);
    }
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-red-400 font-medium mb-2">Something went wrong</h3>
          <p className="text-red-300/70 text-sm">
            {this.state.error?.message || "Unknown error"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
