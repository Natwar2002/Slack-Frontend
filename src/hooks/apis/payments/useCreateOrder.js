import { useMutation } from '@tanstack/react-query';

import { createOrder } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCreateOrder = () => {
    const { auth } = useAuth();
    const { error, isSuccess, isPending, mutateAsync: createOrderMutation } = useMutation({
        mutationFn: (amount) => createOrder({ token: auth?.token, amount }),
        onSuccess: () => {
            console.log('Order Created Successfully');
        },
        onError: () => {
            console.log('Error in Creating Order');
        }
    });

    return {
        error,
        isSuccess,
        isPending,
        createOrderMutation
    };
};