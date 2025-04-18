import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types";

interface SearchResultsProps {
  results: Product[];
  query: string;
  onResultClick: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onResultClick,
}) => {
  const navigate = useNavigate();

  if (query.trim() === "" || results.length === 0) {
    return null;
  }

  // Create a handler that forces navigation for both mobile and desktop
  const handleProductClick = (
    e: React.MouseEvent | React.TouchEvent,
    productId: string
  ) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event bubbling
    onResultClick(); // Close the search results

    // Force navigation to the product page
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 10);
  };

  // Handler for "View all results" link
  const handleViewAllClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onResultClick();

    setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }, 10);
  };

  return (
    <div className="absolute z-50 w-full mt-1 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg top-full max-h-96">
      <div className="p-2 text-sm text-gray-500 border-b border-gray-200">
        {results.length} results found for "{query}"
      </div>
      <div className="py-2">
        {results.slice(0, 6).map((product) => (
          <a
            key={product.id}
            href={`/product/${product.id}`}
            className="flex items-center px-4 py-2 transition-colors hover:bg-gray-50"
            onClick={(e) => handleProductClick(e, product.id)}
            onTouchEnd={(e) => handleProductClick(e, product.id)}
          >
            <div className="flex-shrink-0 w-10 h-10 mr-3">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {product.category}
              </p>
            </div>
            <div className="ml-2">
              <p className="text-sm font-semibold text-gray-900">
                ₹{(product.discountPrice || product.price).toFixed(2)}
              </p>
            </div>
          </a>
        ))}

        {results.length > 6 && (
          <a
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block px-4 py-2 text-sm text-center text-blue-900 hover:bg-gray-50"
            onClick={handleViewAllClick}
            onTouchEnd={handleViewAllClick}
          >
            View all {results.length} results
          </a>
        )}
      </div>
    </div>
  );
};
