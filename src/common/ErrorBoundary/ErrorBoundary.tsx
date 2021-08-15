import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: null as TypeError | null, errorInfo: null as React.ErrorInfo | null };

  componentDidCatch(error: TypeError, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong. Please, retry later</h2>
          <details>
            <summary>Подробнее об ошибке</summary>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
