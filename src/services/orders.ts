import { Order } from '../types';
import { nanoid } from 'nanoid';

// Mock data for orders - in a real app this would come from an API
const mockOrders: Order[] = [
  {
    id: `ORD-${nanoid(8)}`,
    userId: "user123",
    items: [
      {
        product: {
          id: "prod1",
          name: "SmartPhone X Pro",
          category: "smartphones",
          price: 999.99,
          discountPrice: 899.99,
          stock: 15,
          image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
          rating: 4.8
        },
        quantity: 1
      }
    ],
    total: 899.99,
    paymentStatus: "completed",
    orderStatus: "delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    paymentMethod: "cash on delivery",
    createdAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    trackingNumber: "IND12345678",
    estimatedDeliveryDate: new Date(Date.now() + 172800000).toISOString() // 2 days from now
  },
  {
    id: `ORD-${nanoid(8)}`,
    userId: "user123",
    items: [
      {
        product: {
          id: "prod2",
          name: "Laptop Pro",
          category: "laptops",
          price: 1299.99,
          stock: 8,
          image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
          rating: 4.5
        },
        quantity: 1
      }
    ],
    total: 1299.99,
    paymentStatus: "completed",
    orderStatus: "shipped",
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    paymentMethod: "cash on delivery",
    createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    trackingNumber: "IND87654321"
  },
  {
    id: `ORD-${nanoid(8)}`,
    userId: "user123",
    items: [
      {
        product: {
          id: "prod3",
          name: "Wireless Headphones",
          category: "audio",
          price: 199.99,
          discountPrice: 149.99,
          stock: 20,
          image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
          rating: 4.2
        },
        quantity: 2
      }
    ],
    total: 299.98,
    paymentStatus: "completed",
    orderStatus: "processing",
    shippingAddress: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    paymentMethod: "cash on delivery",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  }
];

// Get paginated orders
export const getOrders = async (
  page: number = 1, 
  perPage: number = 10
): Promise<{
  orders: Order[];
  totalPages: number;
  currentPage: number;
}> => {
  // In a production app, this would fetch from a backend API
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedOrders = mockOrders.slice(startIndex, endIndex);
  
  return {
    orders: paginatedOrders,
    totalPages: Math.ceil(mockOrders.length / perPage),
    currentPage: page
  };
};

// Get all orders for a user
export const getUserOrders = () => {
  // In a real app, this would filter by the current user's ID
  // For now, we'll just return all orders from localStorage
  return JSON.parse(localStorage.getItem('userOrders') || '[]');
};

// Get a specific order by ID - combined function that checks both mock data and localStorage
export const getOrderById = (orderId: string): Order | any | null => {
  // First check localStorage for real user orders
  const userOrders = getUserOrders();
  const userOrder = userOrders.find((order: any) => order.id === orderId);
  
  if (userOrder) {
    return userOrder;
  }
  
  // If not found in localStorage, check mock data (for demo purposes)
  const mockOrder = mockOrders.find(order => order.id === orderId);
  return mockOrder || null;
};

// Update order status
export const updateOrderStatus = (orderId: string, status: string) => {
  const orders = getUserOrders();
  const updatedOrders = orders.map((order: any) => {
    if (order.id === orderId) {
      return { ...order, orderStatus: status };
    }
    return order;
  });
  localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  return true;
};
