import { useMutation } from '@tanstack/react-query';

import { capturePaymentRequest } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCaptureOrder = () => {
    const { auth } = useAuth;
    const { mutateAsync: captureOrderMutation, isPending, isSuccess, error } = useMutation({
        mutationFn: ({orderId, paymentId, status, signature }) => capturePaymentRequest({ token: auth?.token, orderId, paymentId, status, signature }),
        onSuccess: (data) => {
            console.log('Successfully captured the payment', data);
            
        },
        onError: (error) => {
            console.log('Error in capturing the payment', error);
        }
    });

    return{
        captureOrderMutation,
        isPending,
        isSuccess,
        error
    };
};