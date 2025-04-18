import React from "react";
import { FallbackProps } from "react-error-boundary";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 text-red-600 bg-red-100 rounded-full">
            <AlertTriangle size={32} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="mb-6 text-center text-gray-600">
            We've encountered an unexpected error. Please try again or return to
            the homepage.
          </p>

          {process.env.NODE_ENV !== "production" && (
            <div className="w-full p-4 mb-4 overflow-auto bg-gray-100 rounded-md max-h-32">
              <p className="font-mono text-sm text-red-600">{error.message}</p>
            </div>
          )}

          <div className="flex w-full gap-4">
            <Button variant="primary" onClick={resetErrorBoundary} fullWidth>
              Try again
            </Button>
            <Link to="/" className="w-full">
              <Button variant="outline" fullWidth>
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
