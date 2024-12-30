import { useMutation } from '@tanstack/react-query';

import { joinToWorkspaceRequest } from '@/apis/workspaces';

import { useAuth } from './useAuth';

export const useJoinWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const { isPending, isSuccess, error, mutateAsync: joinWorkspaceMutation } = useMutation({
        mutationFn: (joinCode) => joinToWorkspaceRequest({ workspaceId, joinCode, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Joined Workspace successfully', data);
        },
        onError: (error) => {
            console.log('Error in joining workspace', error);
        }
    });

    return {
        joinWorkspaceMutation,
        isPending,
        isSuccess,
        error
    };
};