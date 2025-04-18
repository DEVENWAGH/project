import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { HomePage } from "./pages/HomePage";
import { FeaturedPage } from "./pages/FeaturedPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { LoginPage } from "./pages/LoginPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";
import { WishlistPage } from "./pages/WishlistPage";
import { DealsPage } from "./pages/DealsPage";
import { SearchPage } from "./pages/SearchPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AboutPage } from "./pages/AboutPage";
import { FAQPage } from "./pages/FAQPage";
import { ReturnsPage } from "./pages/ReturnsPage";
import { ErrorFallback } from "./components/error/ErrorFallback";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AccountOrdersPage } from "./pages/AccountOrdersPage";
import { OrderTrackingPage } from "./pages/OrderTrackingPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/featured" element={<FeaturedPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryPage />}
              />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />

              {/* Account related routes */}
              <Route
                path="/account/orders"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/account/orders" element={<AccountOrdersPage />} />
              <Route
                path="/track-order/:orderId"
                element={<OrderTrackingPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account/wishlist"
                element={
                  <ProtectedRoute>
                    <WishlistPage />
                  </ProtectedRoute>
                }
              />

              {/* Information pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/search" element={<SearchPage />} />

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
