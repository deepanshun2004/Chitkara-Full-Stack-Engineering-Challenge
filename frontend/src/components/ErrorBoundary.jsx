import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-shell">
          <section className="error-fallback">
            <h1>Something went wrong</h1>
            <p>Refresh the page and try again. The API and input data remain safe.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
