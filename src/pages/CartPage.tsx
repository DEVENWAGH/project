import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { CartItem } from '../components/cart/CartItem';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { ProductList } from '../components/product/ProductList';
import { getFeaturedProducts } from '../data/products';

export const CartPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  
  // Calculate totals
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <div className="h-24 w-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
          
          {/* Featured Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Like</h2>
            <ProductList products={featuredProducts} />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Cart Items ({items.length})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
              </div>
              
              <div>
                {items.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              
              <div className="mt-6">
                <Link to="/" className="flex items-center text-blue-900 hover:text-blue-700">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>₹{shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout} 
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">We Accept:</p>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="mt-6 text-xs text-gray-500">
                <p>
                  By proceeding to checkout, you agree to our{' '}
                  <Link to="/terms" className="text-blue-900 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-900 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};