import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Button } from "../ui/Button";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  featured = false,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // Removed toast.success here to avoid duplicate toasts
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      // Toast handled in WishlistContext
    } else {
      addToWishlist(product);
      // Toast handled in WishlistContext
    }
  };

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.discountPrice || 0)) / product.price) * 100
      )
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col ${
        featured ? "lg:flex-row lg:h-80" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "lg:w-1/2" : "h-48 sm:h-64"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
        />

        {hasDiscount && (
          <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded top-2 left-2">
            {discountPercentage}% OFF
          </div>
        )}

        <button
          className={`absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md ${
            isInWishlist(product.id)
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          } transition-opacity`}
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`w-4 h-4 ${
              isInWishlist(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            } transition-colors`}
          />
        </button>
      </div>

      <div
        className={`p-4 flex flex-col ${
          featured ? "lg:w-1/2 lg:justify-center" : ""
        }`}
      >
        <div className="mb-2">
          <h3
            className={`font-medium text-gray-900 ${
              featured ? "text-xl" : "text-lg"
            }`}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        </div>

        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : i < product.rating
                  ? "text-yellow-300"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
        </div>

        <div className="flex items-center mb-3">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ₹{product.discountPrice}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
          )}
        </div>

        {featured && (
          <p className="mb-4 text-gray-600 line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            leftIcon={<ShoppingCart className="w-4 h-4" />}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};
