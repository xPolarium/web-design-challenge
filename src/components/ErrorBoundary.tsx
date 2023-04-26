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
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (
        <div className="relative h-1/2 w-full bg-white">
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.props.children;
  }
}

export default ErrorBoundary;
