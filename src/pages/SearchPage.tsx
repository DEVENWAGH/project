import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProductGrid } from "../components/product/ProductGrid";
import { FilterSidebar } from "../components/filters/FilterSidebar";
import { SortDropdown } from "../components/filters/SortDropdown";
import { FilterState } from "../types";
import { getProducts } from "../data/products";
import { Search } from "lucide-react";

const initialFilters: FilterState = {
  priceRange: [0, 5000],
  brands: [],
  rating: null,
  inStock: false,
  sortBy: "relevance",
};

export const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters]);

  const performSearch = () => {
    const searchLower = query.toLowerCase();

    // First filter by search query
    let results = getProducts().filter((product) => {
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    });

    // Then apply other filters
    if (filters.priceRange) {
      results = results.filter((product) => {
        const price = product.discountPrice || product.price;
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    if (filters.brands.length > 0) {
      results = results.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    if (filters.rating) {
      results = results.filter((product) => product.rating >= filters.rating);
    }

    if (filters.inStock) {
      results = results.filter((product) => product.stock > 0);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_asc":
          results.sort(
            (a, b) =>
              (a.discountPrice || a.price) - (b.discountPrice || b.price)
          );
          break;
        case "price_desc":
          results.sort(
            (a, b) =>
              (b.discountPrice || b.price) - (a.discountPrice || a.price)
          );
          break;
        case "newest":
          results.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "best_selling":
          results.sort((a, b) => b.totalSold - a.totalSold);
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "relevance":
        default:
          // For relevance, we prioritize name matches first
          results.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(searchLower);
            const bNameMatch = b.name.toLowerCase().includes(searchLower);
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return 0;
          });
      }
    }

    setSearchResults(results);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Search className="mr-2 h-6 w-6" />
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "product" : "products"} found
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Filter Results
          </h2>
          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => handleFilterChange({ sortBy: value })}
            options={[
              { label: "Relevance", value: "relevance" },
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
            <ProductGrid
              products={searchResults}
              isLoading={false}
              gridCols={{
                mobile: 2,
                tablet: 3,
                desktop: 3,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
