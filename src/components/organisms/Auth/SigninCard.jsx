import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SigninCard = () => {

    const [signinForm, setSigninForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    return(
        <Card className='w-full h-full border-none'>
            <CardHeader className='flex justify-center items-center'>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to access your account</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-3">
                    <Input 
                        placeholder='example@gmail.com'
                        required
                        onChange={(e) => setSigninForm({...signinForm, email: e.target.value })}
                        value={signinForm.email}
                        type='email'
                        disabled={false}
                    />
                    <Input 
                        placeholder='Password'
                        required
                        onChange={(e) => setSigninForm({...signinForm, password: e.target.value })}
                        value={signinForm.password}
                        type='password'
                        disabled={false}
                    />
                    <Button
                        disabled={false}
                        size='lg'
                        type='submit'
                        className='w-full bg-[#611F75]'
                    >
                        Sign In
                    </Button>
                </form>

                <Separator className='my-5' />
                <p 
                    className='text-s text-muted-foreground mt-4'
                >
                    Don&apos;t have an account? 
                    <span className='text-sky-600 hover:underline cursor-pointer' onClick={() => navigate('/auth/signup')}> Sign Up</span>
                </p>
            </CardContent>
        </Card>
    );
};