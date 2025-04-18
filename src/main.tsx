import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

// Create a client
const queryClient = new QueryClient();

// Make sure the root element exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found! Check your index.html file.");
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <App />
                  <Toaster position="top-center" />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering application:", error);
    rootElement.innerHTML =
      '<div style="color: red; padding: 20px;">Failed to load the application. Check the console for details.</div>';
  }
}
