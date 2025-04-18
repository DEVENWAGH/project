import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { AlertTriangle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <div className="h-24 w-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            404 - Page Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <Button>Back to Homepage</Button>
            </Link>

            <Link to="/search">
              <Button variant="outline">Search Products</Button>
            </Link>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              You might be interested in
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/featured" className="text-blue-900 hover:underline">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-blue-900 hover:underline">
                  Special Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/account/wishlist"
                  className="text-blue-900 hover:underline"
                >
                  Your Wishlist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-900 hover:underline">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
