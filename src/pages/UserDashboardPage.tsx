import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { User, Package, CreditCard, Heart, LogOut, Settings } from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-12345678',
      date: '2023-10-15',
      status: 'Delivered',
      total: 1299.99
    },
    {
      id: 'ORD-87654321',
      date: '2023-09-28',
      status: 'Processing',
      total: 499.99
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 bg-blue-900 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900">
                    <span className="text-xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-blue-100">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Link to="/account" className="flex items-center p-2 text-gray-900 rounded-md bg-gray-100 font-medium">
                      <User className="w-5 h-5 mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/orders" className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-50">
                      <Package className="w-5 h-5 mr-3" />
                      <span>My Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/wishlist" className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-50">
                      <Heart className="w-5 h-5 mr-3" />
                      <span>Wishlist</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/payment-methods" className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-50">
                      <CreditCard className="w-5 h-5 mr-3" />
                      <span>Payment Methods</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/settings" className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-50">
                      <Settings className="w-5 h-5 mr-3" />
                      <span>Account Settings</span>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center p-2 text-red-600 rounded-md hover:bg-red-50"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Account Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600 mb-1">{user?.name}</p>
                  <p className="text-gray-600 mb-1">{user?.email}</p>
                  <p className="text-gray-600">+91 98765 43210</p>
                  
                  <Button variant="outline" size="sm" className="mt-4">
                    Edit Profile
                  </Button>
                </div>
                
                {/* Default Shipping Address */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Default Shipping Address</h3>
                  {user?.address ? (
                    <>
                      <p className="text-gray-600 mb-1">{user.name}</p>
                      <p className="text-gray-600 mb-1">{user.address.street}</p>
                      <p className="text-gray-600 mb-1">{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                      <p className="text-gray-600">{user.address.country}</p>
                      
                      <Button variant="outline" size="sm" className="mt-4">
                        Edit Address
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">No default address set</p>
                      <Button size="sm">Add Address</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                <Link to="/account/orders" className="text-sm text-blue-900 hover:text-blue-700 font-medium">
                  View All
                </Link>
              </div>
              
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/account/orders/${order.id}`} className="text-blue-900 hover:text-blue-700">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Link to="/">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};