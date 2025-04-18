import React from "react";
import { Layout } from "../components/layout/Layout";
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { toast } from "react-hot-toast";

export const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gray-100 rounded-full">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Your wishlist is empty
          </h1>
          <p className="mb-8 text-gray-600">
            Add items to your wishlist to save them for later.
          </p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Wishlist</h1>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Saved Items ({items.length})
            </h2>
            <button
              onClick={() => clearWishlist()}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear Wishlist
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
              >
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-48"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.id}`} className="block mb-1">
                    <h3 className="font-medium text-gray-900 transition-colors hover:text-blue-900">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mb-2 text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                  <div className="flex items-center mb-4">
                    {item.discountPrice && item.discountPrice < item.price ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.discountPrice}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{item.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full"
                    leftIcon={<ShoppingCart className="w-4 h-4" />}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Link
            to="/"
            className="font-medium text-blue-900 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="flex items-center font-medium text-blue-900 hover:text-blue-700"
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Go to Cart
          </Link>
        </div>
      </div>
    </Layout>
  );
};
