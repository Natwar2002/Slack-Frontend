import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { IoShieldCheckmark } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SigninCard = ({ signinForm, setSigninForm, onSigninFormSubmit, validationError, isSuccess, error, isPending }) => {

    const navigate = useNavigate();

    return(
        <Card className='w-full h-full border-none'>
            <CardHeader className='flex justify-center items-center'>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to access your account</CardDescription>
                {validationError && (
                    <div className='bg-destructive/15 px-4 py-2 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                        <TriangleAlert className='size-5' />
                        <p>{validationError.message}</p>
                    </div>
                )}
                {error && (
                    <div className='bg-destructive/15 px-4 py-2 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                        <TriangleAlert className='size-5' />
                        <p>{error.message}</p>
                    </div>
                )}
                {isSuccess && (
                    <div className='bg-green-200 px-4 py-2 rounded-md flex items-center gap-x-2 text-green-600 text-sm mb-5'>
                        <IoShieldCheckmark className='size-5' />
                        <p>Successfully signed up, You will bw redirected to the home page shortly</p>
                        <LucideLoader2 className='animate-spin ml-2' />
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className="space-y-3" onSubmit={onSigninFormSubmit}>
                    <Input 
                        placeholder='example@gmail.com'
                        required
                        onChange={(e) => setSigninForm({...signinForm, email: e.target.value })}
                        value={signinForm.email}
                        type='email'
                        disabled={isPending}
                    />
                    <Input 
                        placeholder='Password'
                        required
                        onChange={(e) => setSigninForm({...signinForm, password: e.target.value })}
                        value={signinForm.password}
                        type='password'
                        disabled={isPending}
                    />
                    <Button
                        disabled={isPending}
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