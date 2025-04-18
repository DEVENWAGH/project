import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";
import { toast } from "react-hot-toast";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load wishlist from localStorage on init
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse saved wishlist", e);
      }
    }
    setInitialized(true);
  }, []);

  // Save wishlist to localStorage when it changes, but only after initialization
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, initialized]);

  const addToWishlist = (product: Product) => {
    setItems((prevItems) => {
      const isProductInWishlist = prevItems.some(
        (item) => item.id === product.id
      );
      if (isProductInWishlist) {
        return prevItems;
      } else {
        toast.success(`${product.name} added to wishlist`);
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    const productToRemove = items.find((item) => item.id === productId);
    setItems((prevItems) => {
      const filteredItems = prevItems.filter((item) => item.id !== productId);
      if (filteredItems.length !== prevItems.length && productToRemove) {
        toast.success(`${productToRemove.name} removed from wishlist`);
      }
      return filteredItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success("Wishlist cleared");
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
