import { useMutation } from '@tanstack/react-query';

import { updateWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useUpdateWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation } = useMutation({
        mutationFn: (name) => updateWorkspaceRequest({workspaceId, name, token: auth?.token}),
        onSuccess: (data) => {
            console.log('Workspace updated successfully: ', data);
        },
        onError: (error) => {
            console.error('Error in updating workspace: ', error);
        }
    });

    return {
        updateWorkspaceMutation,
        isSuccess,
        isPending,
        error
    };
};