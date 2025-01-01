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
