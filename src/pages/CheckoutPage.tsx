import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { sendOrderNotification } from "../services/notification";
import { nanoid } from "nanoid";
import { OrderNotificationForm } from "../components/email/OrderNotificationForm";

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "Aanchal",
    email: user?.email || "",
    phone: "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: "India",
    paymentMethod: "razorpay", // default to razorpay
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [notificationData, setNotificationData] = useState<any>(null);
  const [showNotificationForm, setShowNotificationForm] = useState(false);

  // Calculate totals
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";

    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      errors.phone = "Phone must be 10 digits";

    if (!formData.street.trim()) errors.street = "Street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Generate order ID
      const orderId = `ORD-${nanoid(8)}`;

      // Create order object with status
      const order = {
        id: orderId,
        items: items,
        total: total,
        paymentStatus: "completed",
        orderStatus: "processing", // Initial status
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        createdAt: new Date().toISOString(),
        estimatedDeliveryDate: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toISOString(), // 5 days from now
        trackingNumber: `TRK-${nanoid(8)}`,
      };

      // Save order to localStorage or your preferred storage
      const existingOrders = JSON.parse(
        localStorage.getItem("userOrders") || "[]"
      );
      localStorage.setItem(
        "userOrders",
        JSON.stringify([...existingOrders, order])
      );

      // Prepare notification data
      const emailData = {
        to: import.meta.env.VITE_ADMIN_EMAIL || "wagh1.2.3.002@gmail.com",
        subject: `New Order: ${orderId}`,
        orderId,
        customerName: formData.name,
        customerEmail: formData.email,
        shippingAddress: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
        products: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.discountPrice || item.product.price,
        })),
        paymentStatus: "completed",
        paymentMethod:
          formData.paymentMethod === "razorpay"
            ? "Razorpay"
            : formData.paymentMethod === "cod"
            ? "Cash on Delivery"
            : formData.paymentMethod,
        orderDate: new Date().toISOString(),
        totalAmount: total,
        shippingMethod: "Standard Shipping",
      };

      try {
        // First attempt to send using the direct API approach
        await sendOrderNotification(emailData);
      } catch (err) {
        // If direct API fails, show the form for manual sending
        console.log("Direct notification failed, showing manual form", err);
        setNotificationData(emailData);
        setShowNotificationForm(true);
      }

      // Clear cart and navigate to confirmation page
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderId,
        },
      });
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formErrors.name}
                    fullWidth
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                    fullWidth
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={formErrors.phone}
                    fullWidth
                  />

                  <div className="md:col-span-2">
                    <Input
                      label="Street Address"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      error={formErrors.street}
                      fullWidth
                    />
                  </div>

                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={formErrors.city}
                    fullWidth
                  />

                  <Input
                    label="State/Province"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={formErrors.state}
                    fullWidth
                  />

                  <Input
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    error={formErrors.zipCode}
                    fullWidth
                  />

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="razorpay"
                      name="paymentMethod"
                      type="radio"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: "razorpay" })
                      }
                      className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="razorpay"
                      className="block ml-3 text-sm font-medium text-gray-700"
                    >
                      Pay with Razorpay (Credit/Debit Card, UPI, Netbanking)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={() =>
                        setFormData({ ...formData, paymentMethod: "cod" })
                      }
                      className="w-4 h-4 text-blue-900 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="cod"
                      className="block ml-3 text-sm font-medium text-gray-700"
                    >
                      Cash on Delivery
                    </label>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="mb-4 text-sm text-gray-500">
                      Your payment information is processed securely. We do not
                      store your credit card details.
                    </p>

                    <Button
                      onClick={handlePayment}
                      isLoading={isProcessing}
                      fullWidth
                    >
                      {isProcessing ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky p-6 bg-white rounded-lg shadow-sm top-20">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Order Summary
              </h2>

              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.product.name} x {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹
                      {(
                        (item.product.discountPrice || item.product.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>₹{shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 font-medium border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-lg text-gray-900">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for notification form if automatic sending fails */}
        {showNotificationForm && notificationData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Send Order Notification
              </h3>
              <p className="mb-4 text-gray-600">
                We couldn't automatically send the order notification. Click
                below to send manually.
              </p>

              <OrderNotificationForm
                orderData={notificationData}
                onSuccess={() => setShowNotificationForm(false)}
                onError={(msg) =>
                  console.error("Manual notification failed:", msg)
                }
              />

              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNotificationForm(false)}
                  fullWidth
                >
                  Skip and Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
