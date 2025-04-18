import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Layout } from "../layout/Layout";
import { Button } from "../ui/Button";

export const CategoryNotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Category Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The category you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Link to="/featured">
            <Button variant="outline">Browse Featured Products</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
