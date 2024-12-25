import axios from 'axios';
import { generateToken } from '../utils/mpesa.js';

export const initializePayment = async (req, res) => {
  try {
    const token = await generateToken();
    const { phoneNumber } = req.body;

    // Format phone number to required format (254XXXXXXXXX)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? `254${phoneNumber.slice(1)}` 
      : phoneNumber;

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: 500,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'W-Squared Agency',
        TransactionDesc: 'Registration Payment'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('M-Pesa initialization error:', error);
    res.status(500).json({ 
      message: 'Payment initialization failed',
      error: error.response?.data || error.message 
    });
  }
};

export const confirmPayment = async (req, res) => {
  // Handle M-Pesa callback
  const { Body: { stkCallback } } = req.body;
  
  try {
    if (stkCallback.ResultCode === 0) {
      // Payment successful
      res.json({ success: true });
    } else {
      // Payment failed
      res.json({ 
        success: false, 
        message: stkCallback.ResultDesc 
      });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process payment confirmation' 
    });
  }
};

export const checkStatus = async (req, res) => {
  const { checkoutRequestId } = req.body;
  
  try {
    // In a real implementation, you would check the status in your database
    // For now, we'll simulate a response
    res.json({ success: true });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to check payment status' 
    });
  }
};