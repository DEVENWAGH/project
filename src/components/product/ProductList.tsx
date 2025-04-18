import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  title?: string;
  featured?: boolean;
  columns?: 2 | 3 | 4;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  title, 
  featured = false,
  columns = 4
}) => {
  let gridCols;
  switch(columns) {
    case 2:
      gridCols = "grid-cols-1 sm:grid-cols-2";
      break;
    case 3:
      gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      break;
    case 4:
    default:
      gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      break;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No products found</h2>
        <p className="text-gray-500">
          We couldn't find any products matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="w-20 h-1 bg-blue-900 mt-2"></div>
        </div>
      )}
      
      <div className={`grid ${gridCols} gap-6`}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            featured={featured}
          />
        ))}
      </div>
    </div>
  );
};