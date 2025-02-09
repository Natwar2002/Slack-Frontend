import axios from 'axios';

import axiosConfig from '@/config/axiosConfig';

export const uploadImageToAWSpresignedUrl = async ({ url, file }) => {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file?.type
            }
        });
        
        console.log('Successfully uploaded the image to S3', response);
        return response;
    } catch (error) {
        console.log('Error in uploading image to S3', error);   
    }
};

export const getPresignedUrl = async ({ token }) => {
    try {
        const response = await axiosConfig.get('/messages/pre-signed-url',{
            headers: {
                'x-access-token' : token
            }
        });
        console.log('Successfully fetched the presigned url', response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in fetching the presigned url', error);
    }
};