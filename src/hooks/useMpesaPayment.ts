import { useState } from 'react';
import { initializeSTKPush, checkPaymentStatus } from '../services/mpesa';

interface UseMpesaPaymentProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const useMpesaPayment = ({ onSuccess, onError }: UseMpesaPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState<string | null>(null);

  const initiatePayment = async (phoneNumber: string, amount: number) => {
    try {
      setIsProcessing(true);
      const response = await initializeSTKPush({ phoneNumber, amount });
      setCheckoutRequestId(response.CheckoutRequestID);
      
      // Start polling for payment status
      startPolling(response.CheckoutRequestID);
    } catch (error) {
      onError('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const startPolling = async (requestId: string) => {
    let attempts = 0;
    const maxAttempts = 30; // Poll for 1 minute (2-second intervals)
    
    const poll = async () => {
      if (attempts >= maxAttempts) {
        setIsProcessing(false);
        onError('Payment verification timeout. Please try again or enter the code manually.');
        return;
      }

      const status = await checkPaymentStatus(requestId);
      if (status) {
        setIsProcessing(false);
        onSuccess();
      } else {
        attempts++;
        setTimeout(poll, 2000); // Poll every 2 seconds
      }
    };

    poll();
  };

  return {
    initiatePayment,
    isProcessing,
    checkoutRequestId
  };
};