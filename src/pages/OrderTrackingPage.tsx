import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Package, CheckCircle, Truck, Clock } from "lucide-react";
import { getOrderById } from "../services/orders";
import { Button } from "../components/ui/Button";

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      const orderData = getOrderById(orderId);
      setOrder(orderData);
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h2>
            <p className="mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Link to="/account/orders">
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <Clock className="h-8 w-8 text-blue-500" />;
      case "shipped":
        return <Truck className="h-8 w-8 text-yellow-500" />;
      case "delivered":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      default:
        return <Package className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Order Tracking
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-medium text-gray-900 text-lg">
                Order #{order.id}
              </h2>
              <p className="text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus.charAt(0).toUpperCase() +
                  order.orderStatus.slice(1)}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  {getStatusIcon(order.orderStatus)}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Current Status</h3>
                  <p className="text-gray-600">
                    {order.orderStatus === "processing"
                      ? "Your order is being processed"
                      : order.orderStatus === "shipped"
                      ? "Your order is on its way"
                      : "Your order has been delivered"}
                  </p>
                </div>
              </div>

              <div className="absolute top-0 left-6 h-full">
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>

              <div className="flex items-center">
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                  <Truck className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">
                    Estimated Delivery
                  </h3>
                  <p className="text-gray-600">
                    {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Shipping Address
              </h3>
              <p className="text-gray-600">
                {order.customerInfo.name}
                <br />
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
              <p className="text-gray-600 mb-1">{order.items.length} item(s)</p>
              <p className="text-gray-900 font-medium">
                Total: ₹{order.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-medium text-gray-900 text-lg mb-4">
            Items in your order
          </h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Package className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-900">
                    {item.product.name}
                  </h4>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-gray-900 font-medium">
                  ₹
                  {(
                    (item.product.discountPrice || item.product.price) *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/account/orders">
            <Button variant="outline" className="mr-4">
              Back to My Orders
            </Button>
          </Link>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
