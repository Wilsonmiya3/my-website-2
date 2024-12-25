import axios from 'axios';

export const generateToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.post(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate M-Pesa token');
  }
};