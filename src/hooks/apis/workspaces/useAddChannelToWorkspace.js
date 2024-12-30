import { useMutation } from '@tanstack/react-query';

import { addChannelToWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useAddChannelToWorkspace = () => {
    const { auth } = useAuth();
    const { isPending, isSuccess, mutateAsync: addChannelToWorkspaceMutation, error } = useMutation({
        mutationFn: ({ workspaceId, channelName }) => addChannelToWorkspaceRequest({ workspaceId, channelName, token: auth?.token }),
        onSuccess: (data) => {
            console.log('Successfully added channel to workspace: ', data);
        },
        onError: (error) => {
            console.error('Error in adding channel to workspace: ', error);
        }
    });

    return {
        addChannelToWorkspaceMutation,
        isPending,
        isSuccess,
        error
    };
};