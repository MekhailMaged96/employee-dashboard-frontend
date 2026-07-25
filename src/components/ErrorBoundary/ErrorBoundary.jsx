import { Component } from "react";

// No hook equivalent exists — error boundaries must be class components
// because they rely on getDerivedStateFromError / componentDidCatch lifecycle methods.
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Runs during render, lets us swap in the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Runs after render, for side effects: logging to a service, etc.
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-lg font-semibold text-red-700">Something went wrong.</p>
            <p className="text-sm text-red-500">{this.state.error?.message}</p>
            <button
              onClick={this.handleReset}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
