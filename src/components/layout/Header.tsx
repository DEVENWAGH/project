import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { Button } from "../ui/Button";
import { getCategories } from "../../data/products";
import { getProducts } from "../../data/products";
import { SearchResults } from "../search/SearchResults";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const categories = getCategories();
  const searchRef = useRef(null);

  // Handle clicks outside of search results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    setShowResults(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // Filter products as user types
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      // Search products by name, description, or category
      const filteredResults = getProducts().filter((product) => {
        const searchLower = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower)
        );
      });

      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
  }`;

  return (
    <header className={headerClasses}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-900">
              TechElectronics
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 md:flex">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-blue-900"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="font-medium text-gray-700 hover:text-blue-900">
                Categories
              </button>
              <div className="absolute left-0 z-50 invisible w-48 mt-2 transition-all duration-300 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="block px-4 py-2 text-sm text-gray-700 capitalize hover:bg-blue-50 hover:text-blue-900"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/featured"
              className="font-medium text-gray-700 hover:text-blue-900"
            >
              Featured
            </Link>
            <Link
              to="/deals"
              className="font-medium text-gray-700 hover:text-blue-900"
            >
              Deals
            </Link>
          </nav>

          {/* Search, Cart and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block" ref={searchRef}>
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() =>
                    searchQuery.trim().length >= 2 && setShowResults(true)
                  }
                />
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              </form>

              {/* Search Results Dropdown */}
              {showResults && (
                <SearchResults
                  results={searchResults}
                  query={searchQuery}
                  onResultClick={() => setShowResults(false)}
                />
              )}
            </div>

            <Link to="/account/wishlist" className="relative hidden md:flex">
              <Heart className="w-6 h-6 text-gray-700 hover:text-blue-900" />
              {wishlistCount > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-900" />
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/account" className="hidden md:block">
                <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-900 rounded-full">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </Link>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 z-20 p-4 pb-4 mx-4 mt-4 bg-white border border-gray-100 rounded-lg shadow-lg md:hidden">
            <form onSubmit={handleSearch} className="relative mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onFocus={() =>
                    searchQuery.trim().length >= 2 && setShowResults(true)
                  }
                />
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              </div>

              {/* Mobile Search Results */}
              {showResults && (
                <SearchResults
                  results={searchResults}
                  query={searchQuery}
                  onResultClick={() => {
                    setShowResults(false);
                    setIsMobileMenuOpen(false);
                  }}
                />
              )}
            </form>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="py-2 font-medium text-gray-700 hover:text-blue-900"
              >
                Home
              </Link>
              <div className="py-2">
                <button className="flex items-center justify-between w-full mb-2 font-medium text-gray-700 hover:text-blue-900">
                  Categories
                </button>
                <div className="flex flex-col pl-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category}`}
                      className="text-gray-600 capitalize hover:text-blue-900"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/featured"
                className="py-2 font-medium text-gray-700 hover:text-blue-900"
              >
                Featured
              </Link>
              <Link
                to="/deals"
                className="py-2 font-medium text-gray-700 hover:text-blue-900"
              >
                Deals
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
