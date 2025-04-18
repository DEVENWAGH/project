export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface RazorpayPayment {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// This would typically communicate with your backend
export const createRazorpayOrder = async (amount: number): Promise<RazorpayOrder> => {
  // In a real implementation, this would call your backend API
  // which would then call Razorpay's API to create an order
  
  // Mock implementation
  return {
    id: `order_${Math.random().toString(36).substring(2, 15)}`,
    amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise)
    currency: "INR",
    receipt: `receipt_${Math.random().toString(36).substring(2, 10)}`
  };
};

// Initialize Razorpay checkout
export const initializeRazorpayCheckout = (
  orderData: RazorpayOrder,
  userDetails: {
    name: string;
    email: string;
    contact?: string;
  },
  onSuccess: (payment: RazorpayPayment) => void,
  onFailure: (error: any) => void
) => {
  // Mock implementation - in a real app, this would integrate with the Razorpay SDK
  const options = {
    key: "rzp_test_YOUR_KEY_ID", // Replace with your test key
    amount: orderData.amount,
    currency: orderData.currency,
    name: "Tech Electronics Store",
    description: "Purchase from Tech Electronics",
    order_id: orderData.id,
    prefill: {
      name: userDetails.name,
      email: userDetails.email,
      contact: userDetails.contact || ""
    },
    theme: {
      color: "#1E3A8A"
    }
  };

  // In a real implementation, you would load the Razorpay SDK
  // and initialize the checkout like this:
  /* 
  const razorpay = new window.Razorpay(options);
  razorpay.on('payment.success', onSuccess);
  razorpay.on('payment.error', onFailure);
  razorpay.open();
  */

  // For this demo, we'll simulate a successful payment after 2 seconds
  setTimeout(() => {
    const mockPayment: RazorpayPayment = {
      razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 15)}`,
      razorpay_order_id: orderData.id,
      razorpay_signature: `${Math.random().toString(36).substring(2, 30)}`
    };
    
    onSuccess(mockPayment);
  }, 2000);
};

// Verify payment on your backend
export const verifyRazorpayPayment = async (payment: RazorpayPayment): Promise<boolean> => {
  // In a real implementation, this would call your backend API
  // which would verify the signature
  
  // Mock implementation always returns success
  return true;
};