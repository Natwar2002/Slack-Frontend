import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspaces', { name, description }, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in create workspace request');
        throw error.response.data;
    }
};

export const fetchWorkspaceRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.get('/workspaces', { workspaceId }, {
            headers: {
                'x-access-token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in fetching workspaces request');
        throw error.response.data;
    }
};