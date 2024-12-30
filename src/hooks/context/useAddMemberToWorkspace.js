import { useMutation } from '@tanstack/react-query';

import { addMemberToWorkspaceRequest } from '@/apis/workspaces';

import { useAuth } from './useAuth';

export const useAddMemberToWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: addMemberToWorkspaceMutation } = useMutation({
        mutationFn: () => addMemberToWorkspaceRequest({ workspaceId, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Member added to workspace successfully', data);
        },
        onError: (error) => {
            console.log('Error in adding member to workspace', error);
            
        }
    });

    return {
        addMemberToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    };
};