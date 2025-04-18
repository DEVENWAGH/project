import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/product/ProductGrid';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { MonitorFilters } from '../components/filters/MonitorFilters';
import { CategoryNotFound } from '../components/error/CategoryNotFound';
import { SortDropdown } from '../components/filters/SortDropdown';
import { FilterState, MonitorFilters as MonitorFiltersType, Product, Category } from '../types';
import { getProductsByCategory, getCategoryBySlug } from '../services/products';

const initialFilters: FilterState = {
  priceRange: [0, 5000],
  brands: [],
  rating: null,
  inStock: false,
  sortBy: 'newest'
};

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [filters, setFilters] = useState<FilterState | MonitorFiltersType>(
    categoryName === 'monitors'
      ? {
          ...initialFilters,
          screenSize: [],
          resolution: [],
          panelType: [],
          refreshRate: []
        }
      : initialFilters
  );
  
  const { data: category, isLoading: isCategoryLoading } = useQuery<Category>({
    queryKey: ['category', categoryName],
    queryFn: () => getCategoryBySlug(categoryName!),
    retry: 2
  });
  
  const { data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ['category-products', categoryName, filters],
    queryFn: () => getProductsByCategory(categoryName!, filters),
    enabled: !!category,
    retry: 3,
    staleTime: 5 * 60 * 1000
  });
  
  if (!isCategoryLoading && !category) {
    return <CategoryNotFound />;
  }
  
  const handleFilterChange = (newFilters: Partial<FilterState | MonitorFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const isLoading = isCategoryLoading || isProductsLoading;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-1 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-900">
                Home
              </Link>
            </li>
            {category?.parent && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <li>
                  <Link
                    to={`/category/${category.parent}`}
                    className="text-gray-500 hover:text-blue-900 capitalize"
                  >
                    {category.parent}
                  </Link>
                </li>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <span className="text-gray-900 font-medium capitalize">
                {category?.name || categoryName}
              </span>
            </li>
          </ol>
        </nav>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {category?.name || categoryName}
          </h1>
          <SortDropdown
            value={filters.sortBy}
            onChange={(value) => handleFilterChange({ sortBy: value })}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {categoryName === 'monitors' ? (
            <MonitorFilters
              filters={filters as MonitorFiltersType}
              onChange={handleFilterChange}
              className="lg:col-span-1"
            />
          ) : (
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              className="lg:col-span-1"
            />
          )}
          
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