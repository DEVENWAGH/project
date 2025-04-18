import nodemailer from 'nodemailer';
import { EmailTemplate } from '../types';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendOrderConfirmationEmail = async (template: EmailTemplate): Promise<boolean> => {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .order-details { margin: 20px 0; }
            .product-list { margin: 20px 0; }
            .product-item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-weight: bold; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
              <p>Thank you for your purchase!</p>
            </div>
            
            <div class="order-details">
              <p><strong>Order ID:</strong> ${template.orderId}</p>
              <p><strong>Order Date:</strong> ${template.orderDate}</p>
              <p><strong>Estimated Delivery:</strong> ${template.estimatedDeliveryDate}</p>
              ${template.trackingNumber ? `<p><strong>Tracking Number:</strong> ${template.trackingNumber}</p>` : ''}
            </div>
            
            <div class="shipping-details">
              <h2>Shipping Address</h2>
              <p>${template.customerName}<br>${template.shippingAddress}</p>
            </div>
            
            <div class="product-list">
              <h2>Order Summary</h2>
              ${template.items.map(item => `
                <div class="product-item">
                  <p>
                    ${item.name} x ${item.quantity}<br>
                    <span>₹${item.price.toFixed(2)}</span>
                  </p>
                </div>
              `).join('')}
              
              <div class="total">
                <p>Total: ₹${template.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div class="payment-info">
              <h2>Payment Information</h2>
              <p><strong>Method:</strong> ${template.paymentMethod}</p>
              <p><strong>Status:</strong> ${template.paymentStatus}</p>
            </div>
            
            <div class="footer">
              <p>
                If you have any questions about your order, please contact our customer service team.<br>
                Email: support@techelectronics.com<br>
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: template.to,
      subject: template.subject,
      html
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};