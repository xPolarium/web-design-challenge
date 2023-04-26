import React from "react";

type ErrorBoundaryProps = {
  fallback: any;
  children?: any;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.props.fallback;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.props.children;
  }
}

export default ErrorBoundary;
