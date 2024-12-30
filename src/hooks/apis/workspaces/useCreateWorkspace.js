import { useMutation } from '@tanstack/react-query';

import { createWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';
// import { useToast } from '@/hooks/use-toast';

export const useCreateWorkspace = () => {
    // const { toast } = useToast();
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: createWorkspaceMutation } = useMutation({
        mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Successfully created workspace', data);
        },
        onError: (error) => {
            console.log(error); 
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createWorkspaceMutation
    };
};