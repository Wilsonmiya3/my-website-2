import axios from 'axios';

interface STKPushRequest {
  phoneNumber: string;
  amount: number;
}

interface STKPushResponse {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CustomerMessage: string;
}

export const initializeSTKPush = async ({ phoneNumber, amount }: STKPushRequest): Promise<STKPushResponse> => {
  try {
    // Format phone number to required format (254XXXXXXXXX)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? `254${phoneNumber.slice(1)}` 
      : phoneNumber;

    const response = await axios.post('/api/mpesa/initialize', {
      phoneNumber: formattedPhone,
      amount
    });

    return response.data;
  } catch (error) {
    console.error('STK Push initialization failed:', error);
    throw error;
  }
};

export const checkPaymentStatus = async (checkoutRequestId: string): Promise<boolean> => {
  try {
    const response = await axios.post('/api/mpesa/status', {
      checkoutRequestId
    });
    return response.data.success;
  } catch (error) {
    console.error('Payment status check failed:', error);
    return false;
  }
};