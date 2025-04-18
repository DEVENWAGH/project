export interface EmailNotification {
  to: string;
  subject: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  paymentStatus: string;
  paymentMethod: string;
  orderDate: string;
  totalAmount: number;
  shippingMethod: string;
}

// Generate improved plain text order notification message
const createOrderTextMessage = (data: EmailNotification): string => {
  return `
==============================
      NEW ORDER RECEIVED
==============================

Order ID: ${data.orderId}
Order Date: ${new Date(data.orderDate).toLocaleString()}

Customer: ${data.customerName} (${data.customerEmail})

Shipping Address:
${data.shippingAddress}

Shipping Method: ${data.shippingMethod}

Payment Status: ${data.paymentStatus}
Payment Method: ${data.paymentMethod}

------------------------------
Products:
${data.products.map(p => `- ${p.name} x ${p.quantity} @ ₹${p.price.toFixed(2)}`).join('\n')}

------------------------------
Total Amount: ₹${data.totalAmount.toFixed(2)}

------------------------------
This is an automated email notification from Tech Electronics Store.
If you have any questions, please contact our customer support.
`.trim();
};

// Send notification using Web3Forms (plain text only)
export const sendOrderNotification = async (data: EmailNotification): Promise<any> => {
  try {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    // Only use plain text content
    const plainTextContent = createOrderTextMessage(data);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: data.subject,
        from_name: 'Tech Electronics Store',
        to_email: data.to || adminEmail,
        message: plainTextContent,
        botcheck: '' // Empty string for botcheck
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log('Order notification sent successfully');
      return result;
    } else {
      throw new Error(result.message || 'Failed to send order notification');
    }
  } catch (error) {
    console.error('Error sending order notification:', error);
    throw error;
  }
};