import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignup } from '@/hooks/apis/auth/useSignup';

import { SignupCard } from './SignupCard';

export const SignupContainer = () => {

    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
    });

    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signupMutation } = useSignup();

    async function onSignupFormSubmit(e) {
        e.preventDefault();

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            setValidationError({ message: 'All feilds are required' });
            console.log('All feilds are required');
            return;
        }

        if(signupForm.password !== signupForm.confirmPassword) {
            setValidationError({ message: 'Password does not match' });
            console.log('Password does not match');
            return;
        }
        setValidationError(null);
        await signupMutation({
            email: signupForm.email,
            password: signupForm.password,
            username: signupForm.username,
        });
    }

    useEffect(()=> {
       setTimeout(() => {
        if(isSuccess) {
            navigate('/auth/signin'); 
       }
       }, 3000);
    }, [isSuccess, navigate]);

    return (
        <SignupCard 
            isPending={isPending}
            isSuccess={isSuccess}
            error={error}
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            onSignupFormSubmit={onSignupFormSubmit}
            validationError={validationError}
        />
    );
};