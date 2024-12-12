import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/apis/auth/useSignin';

import { SigninCard } from './SigninCard';


export const SigninContainer = () => {

    const navigate = useNavigate();
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });
    const [validationError, setValidationError] = useState();

    const { isPending, isSuccess, error, signinMutation} = useSignin(null);

    async function onSigninFormSubmit(e) {
        e.preventDefault();

        if(!signinForm.email || !signinForm.password) {
            console.log('Please fill all the feilds');
            setValidationError({ message: 'Please fill all the feilds'});
        }

        setValidationError(null);

        await signinMutation({
            email: signinForm.email,
            password: signinForm.password
        });
    }

    useEffect(()=> {
        if(isSuccess) {
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        }
    }, [isSuccess, navigate]);

    return(
        <SigninCard 
            signinForm={signinForm}
            setSigninForm={setSigninForm}
            onSigninFormSubmit={onSigninFormSubmit}
            validationError={validationError}
            isPending={isPending}
            isSuccess={isSuccess}
            error={error}
        />
    );
};