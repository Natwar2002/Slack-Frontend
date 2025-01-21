import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId) => {
    const { auth } = useAuth();
    const { isFetched, isError, data: messages, error, isSuccess } = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, token: auth?.token, limit: 10, offset: 20 }),
        queryKey: ['getPaginatedMessages']
    });

    return {
        isFetched,
        isError,
        error,
        messages,
        isSuccess
    };
};