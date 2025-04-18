import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { SortDropdown } from '../components/filters/SortDropdown';
import { FilterState, Product } from '../types';
import { getFeaturedProducts } from '../services/products';

const initialFilters: FilterState = {
  priceRange: [0, 5000],
  brands: [],
  rating: null,
  inStock: false,
  sortBy: 'newest'
};

export const FeaturedPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['featured-products', filters],
    queryFn: () => getFeaturedProducts(filters),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (error) {
    toast.error('Failed to load products. Please try again.');
  }
  
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => handleFilterChange({ sortBy: value })}
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
              products={products || []}
              isLoading={isLoading}
              gridCols={{
                mobile: 2,
                tablet: 3,
                desktop: 4
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};