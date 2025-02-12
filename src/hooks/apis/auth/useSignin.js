import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/auth';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useSignin = () => {
    const { setAuth } = useAuth();
    const { toast } = useToast();
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Successfully signed in: ', response);
            const userObject = JSON.stringify(response);
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.token);

            setAuth({
                token: response.token,
                user: response,
                isLoading: false
            });

            toast({
                title: 'Successfully signed in',
                message: 'You will be redirected to the home page shortly',
                type: 'success'
            });
        },
        onError: (error) => {
            console.log('Failed to sign in', error);
            toast({
                title: 'Failed to sign in',
                message: error.message,
                type: 'success',
                variant: 'destructive'
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};