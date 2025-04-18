import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { CheckCircle, Calendar, Package } from "lucide-react";

export const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  // If no order ID is provided, redirect to home
  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-green-500">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped shortly.
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-blue-900 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">Order Number</h3>
                    <p className="text-gray-600">{orderId}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-900 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">Order Date</h3>
                    <p className="text-gray-600">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-blue-900 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">Shipping</h3>
                    <p className="text-gray-600">
                      Standard Shipping (3-5 business days)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            We've sent you a confirmation email with all the details of your
            order. You can also check the status of your order in your account
            dashboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={`/track-order/${orderId}`}>
              <Button variant="outline">Track Order</Button>
            </Link>
            <Link to="/account/orders">
              <Button variant="outline">View All Orders</Button>
            </Link>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
