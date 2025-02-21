import { useEffect } from 'react';

import { useCaptureOrder } from '@/hooks/apis/payments/useCaptureOrder';

const loadRazorpayScript = (src) => {
    return new Promise((res) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Razorpay script loaded');
            res(true);
        };
        script.onerror = () => {
            console.log('Error in loading Razorpay script');
            res(false);
        };
        document.body.appendChild(script);
    });
};

export const RenderRazorpayPopup = ({ amount, currency, orderId }) => {

    const { captureOrderMutation } = useCaptureOrder();

    const display = async(options) => {
        const scriptResponse = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!scriptResponse) {
            console.log('Error in loading Razorpay script');
            return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', async function(response) {
            console.log('Payment Failed', response);
            await captureOrderMutation({
                orderId: options.order_id,
                status: 'Failed',
                paymentId: ''
            });
        });

        rzp.open();
    };

    useEffect(()=> {
        display({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount,
            currency,
            name: 'Natwar Patidar',
            description: 'Test Transaction',
            order_id: orderId,
            handler: async (response) => {
                console.log('Payment success', response);
                console.log('Signature', response.razorpay_signature);
                await captureOrderMutation({
                    orderId,
                    status: 'Success',
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                });
            }
        });
    }, [orderId]);

    return null;
};