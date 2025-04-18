import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { getProductById, getProductsByCategory } from "../data/products";
import { ProductList } from "../components/product/ProductList";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (id) {
      const productData = getProductById(id);
      setProduct(productData);
      if (productData) {
        setCurrentImage(productData.image);
        // Get related products from the same category but exclude current product
        const related = getProductsByCategory(productData.category)
          .filter((p) => p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      // Toast is handled in WishlistContext
    } else {
      addToWishlist(product);
      // Toast is handled in WishlistContext - remove any duplicate toast.success call here
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
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <ol className="flex items-center space-x-1 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-blue-900">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                to={`/category/${product.category}`}
                className="text-gray-500 capitalize hover:text-blue-900"
              >
                {product.category}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="max-w-xs font-medium text-gray-900 truncate">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <div className="mb-4 overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1">
              <img
                src={currentImage}
                alt={product.name}
                className="object-contain w-full h-96"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`bg-gray-100 rounded-md overflow-hidden border-2 ${
                    currentImage === image
                      ? "border-blue-900"
                      : "border-transparent"
                  }`}
                  onClick={() => setCurrentImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="object-cover w-full h-20"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.rating} rating)
                </span>
              </div>

              <div className="flex items-center mb-6">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.discountPrice}
                    </span>
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    <span className="px-2 py-1 ml-3 text-sm font-medium text-white bg-red-500 rounded">
                      {discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <p className="mb-6 text-gray-700">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <p className="flex items-center text-sm">
                <span className="mr-2">Availability:</span>
                {product.stock > 0 ? (
                  <span className="font-medium text-green-600">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="font-medium text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex mb-8">
              <div className="flex w-32 mr-4 border border-gray-300 rounded-md">
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full text-center border-0 focus:ring-0"
                />
                <button
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1"
                leftIcon={<ShoppingCart className="w-5 h-5" />}
              >
                Add to Cart
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex mb-8 space-x-4">
              <button
                className="flex items-center text-gray-700 hover:text-red-500"
                onClick={handleAddToWishlist}
              >
                <Heart
                  className={`w-5 h-5 mr-1 ${
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>
                  {isInWishlist(product.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-500">
                <Share2 className="w-5 h-5 mr-1" />
                <span>Share</span>
              </button>
            </div>

            {/* Product Benefits */}
            <div className="pt-6 space-y-4 border-t border-gray-200">
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-blue-900 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">
                    Free shipping on orders over ₹500
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-900 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">2 Year Warranty</p>
                  <p className="text-sm text-gray-600">
                    Full coverage for peace of mind
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="w-5 h-5 text-blue-900 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">30-Day Returns</p>
                  <p className="text-sm text-gray-600">
                    Easy returns if you change your mind
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "description"
                    ? "border-blue-900 text-blue-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "specifications"
                    ? "border-blue-900 text-blue-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "reviews"
                    ? "border-blue-900 text-blue-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="w-1/3 px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            {key}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="mx-2 text-gray-500">|</span>
                  <span className="text-gray-500">12 Reviews</span>
                </div>

                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Aanchal Doe</h4>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < 5 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">
                      Excellent product! Exactly as described and arrived
                      quickly. The quality is superb.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Jane Smith</h4>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">
                      Very good product. Would have given 5 stars but delivery
                      was slightly delayed.
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button>Write a Review</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <ProductList products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};
