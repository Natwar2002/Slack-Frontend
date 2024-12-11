import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full flex-col justify-center items-center bg-gray-100">
            <Card className="text-center shadow-lg max-w-lg">
                <CardHeader>
                    <CardTitle>404 Not Found</CardTitle>
                    <p className='text-gray-600'>The page you are looking for does not exist</p>
                </CardHeader>
                <CardContent>
                    <img className='h-[300px] w-[400px]' src="https://img.freepik.com/premium-vector/404-error-illustration-maintenance-system-technology-showing-404-internet-connection-problem-message_199064-100.jpg?uid=R125257312&ga=GA1.1.1350553168.1733936482&semt=ais_hybrid" />
                    <Button
                        className='mt-4'
                        variant='outline'
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
};