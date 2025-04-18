export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  brand: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  specifications: {
    [key: string]: string;
  };
  featured?: boolean;
  createdAt: string;
  totalSold: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentId?: string;
  paymentMethod: string;
  createdAt: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  rating: number | null;
  inStock: boolean;
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'best_selling' | 'rating';
}

export interface MonitorFilters extends FilterState {
  screenSize: string[];
  resolution: string[];
  panelType: string[];
  refreshRate: string[];
}

export type SortOption = {
  label: string;
  value: FilterState['sortBy'];
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  image?: string;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentStatus: string;
  paymentMethod: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  trackingNumber?: string;
}