import React from "react";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "../ui/Skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  gridCols?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  gridCols = {
    mobile: 1,
    tablet: 3,
    desktop: 4,
  },
}) => {
  const gridClasses = `grid grid-cols-${gridCols.mobile} sm:grid-cols-${gridCols.tablet} lg:grid-cols-${gridCols.desktop} gap-6`;

  if (isLoading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-4">
            <Skeleton className="h-48 w-full rounded-lg mb-4" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-5 w-1/2 mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-xl font-medium text-gray-700 mb-4">
          No products found
        </p>
        <p className="text-gray-500">
          Try adjusting your filters or search term to find what you're looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
