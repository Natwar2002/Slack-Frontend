import { useQuery } from '@tanstack/react-query';

import { getChannelRequest } from '@/apis/channels';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelById = (channelId) => {
    const { auth } = useAuth();
    const { isFetching, isSuccess, error, isError, data: channelDetails } = useQuery({
        queryFn: () => getChannelRequest({ channelId, token: auth?.token }),
        queryKey: [`get-channel-${channelId}`],
    });

    return {
        isFetching,
        isError,
        isSuccess,
        error,
        channelDetails
    };
};