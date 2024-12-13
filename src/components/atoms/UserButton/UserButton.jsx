import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { LogOutIcon, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

export const UserButton = () => {
    const { auth, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    async function handleLogout() {
        await logout();
        toast({
            title: 'Successfully signed out',
            type: 'success'
        });
        navigate('/auth/signin');
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-60 transition'>
                    <AvatarImage src={auth?.user?.avatar} className='w-[30px] h-[30px]'/>
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Settings className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className='size-4 mr-2 h-10' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};