import axios from '@/config/axiosConfig';

export const getChannelRequest = async({ channelId, token }) => {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.error('Error in get channel request');
        throw error.response.data;
    }
};

export const getPaginatedMessages = async({ channelId, token, limit, offset }) => {
    try {
        const response = await axios.get(`/messages/${channelId}`, {
            params: {
                limit: limit || 20,
                offset: offset || 1,
            },
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.error('Error in get paginated messages request');
        throw error.response.data;
    }
};