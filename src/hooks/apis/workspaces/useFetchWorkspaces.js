import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useFetchWorkspaces = () => {
    const { auth } = useAuth();
    const { isFetching, isSuccess, error, data: workspaces } = useQuery({
        queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
        queryKey: ['fetchWorkspaces'],
        staleTime: 30000,
    });

    return {
        isFetching,
        isSuccess,
        error,
        workspaces
    };
};