// src/components/marketing/case-studies/case-study-error-boundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { trackError } from "@/lib/analytics"; // Update import path

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CaseStudyErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Case Study error:", error, errorInfo);
    trackError({
      error,
      errorInfo,
      component: "CaseStudy",
      location: window.location.href,
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We're having trouble loading this content.
            </p>
            <Button onClick={this.handleRetry}>Try Again</Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
