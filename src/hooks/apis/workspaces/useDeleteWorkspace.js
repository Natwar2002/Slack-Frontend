import { useMutation } from '@tanstack/react-query';

import { deleteWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useDeleteWorkspace = (workspaceId)  => {
    const { auth } = useAuth();
    const { error, isPending, isSuccess, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: () => {
            console.log('Workspace deleted successfully');     
        },
        onError: (error) => {
            console.error('Error in deleting workspace: ', error);
        }
    });

    return {
        error,
        deleteWorkspaceMutation,
        isPending,
        isSuccess
    };
};