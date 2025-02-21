import axios from '@/config/axiosConfig';

export const createOrder = async ({ token, amount }) => {
    try {
        const response = await axios.post('/payments/order', { amount }, {
            headers: {
                'x-access-token': token
            }
        });
        console.log(response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in creating order', error);
    }
};

export const capturePaymentRequest = async ({ token, orderId, paymentId, status, signature }) => {
    try {
        const response = await axios.post('/payments/capture', { orderId, paymentId, status, signature }, {
            headers: {
                'x-access-token': token
            }
        });
        console.log(response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in capturing order', error);
    }
};