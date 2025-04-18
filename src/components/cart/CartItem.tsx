import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  const productPrice = product.discountPrice || product.price;
  const totalPrice = productPrice * quantity;
  
  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      <div className="flex sm:w-3/4">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="ml-4 flex flex-col flex-1">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
          
          <div className="flex items-center mt-2 sm:mt-auto">
            <button
              onClick={handleDecreaseQuantity}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="mx-2 text-gray-700 w-8 text-center">{quantity}</span>
            
            <button
              onClick={handleIncreaseQuantity}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 sm:mt-0 sm:w-1/4">
        <div className="text-right">
          <p className="text-lg font-medium text-gray-900">₹{totalPrice.toFixed(2)}</p>
          {quantity > 1 && (
            <p className="text-sm text-gray-500">₹{productPrice.toFixed(2)} each</p>
          )}
        </div>
        
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};