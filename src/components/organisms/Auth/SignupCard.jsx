import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SignupCard = () => {

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    return(
        <Card className='w-full h-full border-none'>
            <CardHeader className='flex justify-center items-center'>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Sign up to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-3">
                    <Input 
                        placeholder='example@gmail.com'
                        required
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value })}
                        value={signupForm.email}
                        type='email'
                        disabled={false}
                    />
                    <Input 
                        placeholder='Password'
                        required
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value })}
                        value={signupForm.password}
                        type='password'
                        disabled={false}
                    />
                    <Input 
                        placeholder='Confirm Password'
                        required
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value })}
                        value={signupForm.confirmPassword}
                        type='password'
                        disabled={false}
                    />
                    <Input 
                        placeholder='Your username'
                        required
                        onChange={(e) => setSignupForm({...signupForm, username: e.target.value })}
                        value={signupForm.username}
                        type='text'
                        disabled={false}
                    />
                    <Button
                        disabled={false}
                        size='lg'
                        type='submit'
                        className='w-full bg-slack'
                    >
                        Sign Up
                    </Button>
                </form>

                <Separator className='my-5' />
                <p 
                    className='text-s text-muted-foreground mt-4'
                >
                    Alread have an account? 
                    <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=> navigate('/auth/signin')}> Sign In</span>
                </p>
            </CardContent>
        </Card>
    );
};