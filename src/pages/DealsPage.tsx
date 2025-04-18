import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Layout } from "../components/layout/Layout";
import { ProductGrid } from "../components/product/ProductGrid";
import { FilterSidebar } from "../components/filters/FilterSidebar";
import { SortDropdown } from "../components/filters/SortDropdown";
import { FilterState } from "../types";
import { getDiscountedProducts } from "../services/products";
import { TagIcon } from "lucide-react";

export const DealsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 5000],
    brands: [],
    rating: null,
    inStock: false,
    sortBy: "discount", // Default sort by discount percentage
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["discountedProducts", filters],
    queryFn: () => getDiscountedProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    toast.error("Failed to load discounted products. Please try again.");
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Special Deals & Discounts
              </h1>
              <p className="text-lg opacity-90">
                Incredible savings on top products. Limited time offers!
              </p>
            </div>
            <div className="hidden md:block">
              <TagIcon className="h-24 w-24 opacity-80" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Discounted Products
          </h2>
          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => handleFilterChange({ sortBy: value })}
            options={[
              { label: "Highest Discount", value: "discount" },
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
              { label: "Best Selling", value: "best_selling" },
              { label: "Highest Rated", value: "rating" },
              { label: "Newest", value: "newest" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-200 rounded-lg h-64"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              // No products found
              <div className="text-center py-16">
                <TagIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No discounted products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later for new deals.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
