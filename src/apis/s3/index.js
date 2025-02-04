import axios from 'axios';
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