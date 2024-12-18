import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspaces } from '@/hooks/apis/workspaces/useFetchWorkspaces';

export const Home = () => {

    const navigate = useNavigate();
    const { isFetching, workspaces } = useFetchWorkspaces();
    useEffect(()=> {
        if(isFetching) return;
        console.log('Workspaces: ', workspaces);
        if(workspaces.length === 0 || !workspaces) {
            console.log('No workspaces found, creating one');   
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }
    }, [isFetching, workspaces, navigate]);

    return(
        <>
            <h1>Home</h1>
            <UserButton />
        </>
    );
};