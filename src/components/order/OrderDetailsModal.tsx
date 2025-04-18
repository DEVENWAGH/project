import React from "react";
import { X, Package } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${
                  order.orderStatus === "processing"
                    ? "bg-blue-100 text-blue-800"
                    : order.orderStatus === "shipped"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {order.orderStatus.charAt(0).toUpperCase() +
                  order.orderStatus.slice(1)}
              </span>
              <Link
                to={`/track-order/${order.id}`}
                className="ml-3 text-sm text-blue-900 hover:text-blue-700"
              >
                Track Order
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 pb-2">
            <h4 className="font-medium mb-3">Items</h4>
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <Package className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹
                    {(item.product.discountPrice || item.product.price).toFixed(
                      2
                    )}{" "}
                    x {item.quantity}
                  </p>
                </div>
                <div className="font-medium">
                  ₹
                  {(
                    (item.product.discountPrice || item.product.price) *
                    item.quantity
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end mt-4">
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <p className="text-sm text-gray-600">
                {order.customerInfo?.name}
                <br />
                {order.shippingAddress?.street}
                <br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.zipCode}
                <br />
                {order.shippingAddress?.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
              <p className="text-sm text-gray-500 mt-2">Order Total</p>
              <p className="font-medium text-lg">₹{order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
