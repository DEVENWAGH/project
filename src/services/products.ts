import { Product, Category, FilterState, MonitorFilters } from '../types';
import { products } from '../data/products';

// Get products by category with filtering
export const getProductsByCategory = async (categoryName: string, filters: FilterState | MonitorFilters): Promise<Product[]> => {
  // In a real app, this would be an API call
  // For now, we'll filter the mock data based on category and filters
  let filteredProducts = products.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
  
  // Apply price range filter
  filteredProducts = filteredProducts.filter(product => {
    const productPrice = product.discountPrice || product.price;
    return productPrice >= filters.priceRange[0] && productPrice <= filters.priceRange[1];
  });
  
  // Apply brand filter
  if (filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      filters.brands.includes(product.brand)
    );
  }
  
  // Apply rating filter
  if (filters.rating) {
    filteredProducts = filteredProducts.filter(product => 
      product.rating >= filters.rating
    );
  }
  
  // Apply in-stock filter
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(product => product.stock > 0);
  }
  
  // Apply monitor-specific filters if applicable
  if ('screenSize' in filters && filters.screenSize.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const specs = product.specifications;
      if (!specs || !specs["Screen Size"]) return false;
      return filters.screenSize.some(size => specs["Screen Size"].includes(size));
    });
  }
  
  if ('resolution' in filters && filters.resolution.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const specs = product.specifications;
      if (!specs || !specs["Resolution"]) return false;
      return filters.resolution.some(res => specs["Resolution"].includes(res));
    });
  }
  
  if ('panelType' in filters && filters.panelType.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const specs = product.specifications;
      if (!specs || !specs["Panel Type"]) return false;
      return filters.panelType.some(type => specs["Panel Type"].includes(type));
    });
  }
  
  if ('refreshRate' in filters && filters.refreshRate.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const specs = product.specifications;
      if (!specs || !specs["Refresh Rate"]) return false;
      return filters.refreshRate.some(rate => specs["Refresh Rate"].includes(rate));
    });
  }
  
  // Apply sorting
  switch (filters.sortBy) {
    case 'price_asc':
      filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      break;
    case 'price_desc':
      filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      break;
    case 'newest':
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'best_selling':
      filteredProducts.sort((a, b) => b.totalSold - a.totalSold);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Default sorting by newest
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  return filteredProducts;
};

// Get category details by slug
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  // In a real app, this would be an API call
  // For now let's return a mock category
  const mockCategories: Record<string, Category> = {
    laptops: {
      id: '1',
      name: 'Laptops',
      slug: 'laptops',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    },
    monitors: {
      id: '2',
      name: 'Monitors',
      slug: 'monitors',
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg'
    },
    smartphones: {
      id: '3',
      name: 'Smartphones',
      slug: 'smartphones',
      parent: 'electronics',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
    },
    audio: {
      id: '4',
      name: 'Audio',
      slug: 'audio',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
    },
    gaming: {
      id: '5',
      name: 'Gaming',
      slug: 'gaming',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'
    },
    televisions: {
      id: '6',
      name: 'Televisions',
      slug: 'televisions',
      image: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg'
    },
    accessories: {
      id: '7',
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.pexels.com/photos/5240543/pexels-photo-5240543.jpeg'
    },
    'smart home': {
      id: '8',
      name: 'Smart Home',
      slug: 'smart-home',
      image: 'https://images.pexels.com/photos/1034808/pexels-photo-1034808.jpeg'
    }
  };
  
  return mockCategories[slug] || null;
};

// Get featured products with filtering options
export const getFeaturedProducts = async (filters?: FilterState): Promise<Product[]> => {
  let featuredProducts = products.filter(product => product.featured);
  
  if (filters) {
    // Apply the same filtering logic as in getProductsByCategory
    if (filters.priceRange) {
      featuredProducts = featuredProducts.filter(product => {
        const productPrice = product.discountPrice || product.price;
        return productPrice >= filters.priceRange[0] && productPrice <= filters.priceRange[1];
      });
    }
    
    if (filters.brands && filters.brands.length > 0) {
      featuredProducts = featuredProducts.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    if (filters.rating) {
      featuredProducts = featuredProducts.filter(product => 
        product.rating >= filters.rating
      );
    }
    
    if (filters.inStock) {
      featuredProducts = featuredProducts.filter(product => product.stock > 0);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          featuredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price_desc':
          featuredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'newest':
          featuredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'best_selling':
          featuredProducts.sort((a, b) => b.totalSold - a.totalSold);
          break;
        case 'rating':
          featuredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
  }
  
  return featuredProducts;
};

// Add a new function to get discounted products
export const getDiscountedProducts = async (filters?: Partial<FilterState>) => {
  // Get all products
  const allProducts = products;
  
  // Filter only products that have a discount
  let discountedProducts = allProducts.filter(
    (product) => product.discountPrice && product.discountPrice < product.price
  );
  
  // Apply any additional filters if provided
  if (filters) {
    // Apply price range filter if set
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      discountedProducts = discountedProducts.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= min && price <= max;
      });
    }

    // Apply brand filter if set
    if (filters.brands && filters.brands.length > 0) {
      discountedProducts = discountedProducts.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Apply rating filter if set
    if (filters.rating) {
      discountedProducts = discountedProducts.filter(product => 
        product.rating >= filters.rating
      );
    }

    // Apply in stock filter if set
    if (filters.inStock) {
      discountedProducts = discountedProducts.filter(product => 
        product.stock > 0
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          discountedProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price_desc':
          discountedProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'newest':
          discountedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'best_selling':
          discountedProducts.sort((a, b) => b.totalSold - a.totalSold);
          break;
        case 'rating':
          discountedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          // Sort by discount percentage (highest first)
          discountedProducts.sort((a, b) => {
            const discountA = a.discountPrice ? ((a.price - a.discountPrice) / a.price) * 100 : 0;
            const discountB = b.discountPrice ? ((b.price - b.discountPrice) / b.price) * 100 : 0;
            return discountB - discountA;
          });
          break;
      }
    } else {
      // Default sort by discount percentage
      discountedProducts.sort((a, b) => {
        const discountA = a.discountPrice ? ((a.price - a.discountPrice) / a.price) * 100 : 0;
        const discountB = b.discountPrice ? ((b.price - b.discountPrice) / b.price) * 100 : 0;
        return discountB - discountA;
      });
    }
  }
  
  return discountedProducts;
};

// Add a new function to get new arrivals
export const getNewArrivals = async (filters: FilterState, limit = 20) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let newArrivals = products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
    
  // Apply price range filter
  if (filters.priceRange) {
    newArrivals = newArrivals.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
  }
  
  if (filters.brands && filters.brands.length > 0) {
    newArrivals = newArrivals.filter(product => 
      filters.brands.includes(product.brand)
    );
  }
  
  if (filters.rating) {
    newArrivals = newArrivals.filter(product => 
      product.rating >= filters.rating
    );
  }
  
  if (filters.inStock) {
    newArrivals = newArrivals.filter(product => product.stock > 0);
  }
  
  // Apply sorting
  if (filters.sortBy && filters.sortBy !== 'newest') {
    switch (filters.sortBy) {
      case 'price_asc':
        newArrivals.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price_desc':
        newArrivals.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'best_selling':
        newArrivals.sort((a, b) => b.totalSold - a.totalSold);
        break;
      case 'rating':
        newArrivals.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return newArrivals;
};
