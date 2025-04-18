import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { EmailNotification } from "../../services/notification";
import { Button } from "../ui/Button";

interface OrderNotificationFormProps {
  orderData: EmailNotification;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const OrderNotificationForm: React.FC<OrderNotificationFormProps> = ({
  orderData,
  onSuccess,
  onError,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      botcheck: false,
    },
  });

  // Create HTML content for the email
  const htmlContent = createOrderEmailTemplate(orderData);

  // Plain text fallback message
  const plainTextMessage = `
New Order: ${orderData.orderId}
Customer: ${orderData.customerName} (${orderData.customerEmail})
Total: ₹${orderData.totalAmount.toFixed(2)}
Payment: ${orderData.paymentStatus}
Shipping Address: ${orderData.shippingAddress}
Products: ${orderData.products
    .map((p) => `${p.name} x ${p.quantity} - ₹${p.price.toFixed(2)}`)
    .join(", ")}
  `.trim();

  // Use the Web3Forms hook
  const { submit } = useWeb3Forms({
    access_key:
      import.meta.env.VITE_WEB3FORMS_KEY ||
      "3af0372a-7376-40d5-87b6-9c1f9de71fdd",
    settings: {
      from_name: "Tech Electronics Store",
      subject: orderData.subject,
    },
    onSuccess: (successMessage) => {
      setIsSuccess(true);
      setMessage(successMessage);
      if (onSuccess) onSuccess();
    },
    onError: (errorMessage) => {
      setIsSuccess(false);
      setMessage(errorMessage);
      if (onError) onError(errorMessage);
    },
  });

  const onSubmit = (data: any) => {
    // Add the necessary form data
    const formData = {
      ...data,
      name: orderData.customerName,
      email: orderData.customerEmail,
      subject: orderData.subject,
      message: plainTextMessage,
      html: htmlContent,
    };

    // Submit the form
    submit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden bot field to prevent spam */}
        <input
          type="checkbox"
          style={{ display: "none" }}
          className="hidden"
          {...register("botcheck")}
        />

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          {isSubmitting ? "Sending notification..." : "Send order notification"}
        </Button>
      </form>

      {isSuccess ? (
        <div className="mt-3 text-sm text-center text-green-500">
          {message || "Order notification sent successfully"}
        </div>
      ) : (
        message && (
          <div className="mt-3 text-sm text-center text-red-500">
            {message || "Failed to send notification. Please try again."}
          </div>
        )
      )}
    </div>
  );
};

// Template function for creating HTML email content
const createOrderEmailTemplate = (data: EmailNotification): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Notification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; background-color: #1E3A8A; color: white; }
          h1 { margin: 0; font-size: 24px; }
          h2 { font-size: 18px; margin-top: 25px; margin-bottom: 10px; color: #1E3A8A; }
          .section { margin-bottom: 25px; background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
          .product-item { padding: 10px 0; border-bottom: 1px solid #eee; }
          .product-item:last-child { border-bottom: none; }
          .total { font-weight: bold; margin-top: 15px; font-size: 16px; text-align: right; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          table { width: 100%; border-collapse: collapse; }
          th { text-align: left; padding: 8px; }
          td { padding: 8px; }
          .detail-label { font-weight: bold; width: 40%; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received</h1>
          </div>
          
          <p>A new order has been placed on your store.</p>
          
          <div class="section">
            <h2>Order Details</h2>
            <table>
              <tr>
                <td class="detail-label">Order ID:</td>
                <td>${data.orderId}</td>
              </tr>
              <tr>
                <td class="detail-label">Order Date:</td>
                <td>${new Date(data.orderDate).toLocaleString()}</td>
              </tr>
              <tr>
                <td class="detail-label">Payment Status:</td>
                <td><strong>${data.paymentStatus}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Customer Information</h2>
            <table>
              <tr>
                <td class="detail-label">Name:</td>
                <td>${data.customerName}</td>
              </tr>
              <tr>
                <td class="detail-label">Email:</td>
                <td>${data.customerEmail}</td>
              </tr>
              <tr>
                <td class="detail-label">Shipping Address:</td>
                <td>${data.shippingAddress}</td>
              </tr>
              <tr>
                <td class="detail-label">Shipping Method:</td>
                <td>${data.shippingMethod}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h2>Order Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${data.products
                  .map(
                    (item) => `
                  <tr class="product-item">
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
            
            <div class="total">
              <p>Total Amount: ₹${data.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          
          <div class="footer">
            <p>
              This is an automated email notification from Tech Electronics Store.<br>
              If you have any questions, please contact our customer support.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
