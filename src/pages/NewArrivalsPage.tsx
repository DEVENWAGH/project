import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Layout } from "../components/layout/Layout";
import { ProductGrid } from "../components/product/ProductGrid";
import { FilterSidebar } from "../components/filters/FilterSidebar";
import { SortDropdown } from "../components/filters/SortDropdown";
import { FilterState } from "../types";
import { getNewArrivals } from "../services/products";
import { Clock } from "lucide-react";

export const NewArrivalsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    brands: [],
    rating: null,
    inStock: false,
    sortBy: "newest", // Default sort by newest
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newArrivals", filters],
    queryFn: () => getNewArrivals(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    toast.error("Failed to load new arrivals. Please try again.");
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        {/* Hero section */}
        <div className="p-8 mb-8 text-white rounded-lg bg-gradient-to-r from-blue-700 to-blue-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                New Arrivals
              </h1>
              <p className="text-lg opacity-90">
                Discover our latest products and stay ahead of the curve
              </p>
            </div>
            <div className="hidden md:block">
              <Clock className="w-24 h-24 opacity-80" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => handleFilterChange({ sortBy: value })}
            options={[
              { label: "Newest First", value: "newest" },
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
              { label: "Best Selling", value: "best_selling" },
              { label: "Highest Rated", value: "rating" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            className="lg:col-span-1"
          />

          <div className="lg:col-span-3">
            {products && products.length > 0 ? (
              <ProductGrid
                products={products}
                isLoading={isLoading}
                gridCols={{
                  mobile: 2,
                  tablet: 3,
                  desktop: 3,
                }}
              />
            ) : isLoading ? (
              // Show loading state
              <div className="flex justify-center">
                <div className="grid w-full grid-cols-2 gap-4 animate-pulse md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-64 bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              // No products found
              <div className="py-16 text-center">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-medium text-gray-900">
                  No new arrivals found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for new
                  products.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
