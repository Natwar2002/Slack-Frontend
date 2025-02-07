import { LogOutIcon, Pencil, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import { useToast } from '@/hooks/use-toast';

export const UserButton = () => {
    const { auth, logout } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    async function handleLogout() {
        await logout();
        toast({
            title: 'Successfully signed out',
            type: 'success'
        });
        navigate('/auth/signin');
    }

    function openCreateWorkspaceModal () {
        setOpenCreateWorkspaceModal(true);
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-65 transition'>
                    <AvatarImage src={auth?.user?.avatar} className='w-[35px] h-[35px]' />
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-slate-100 px-3 py-2 rounded-md'>
                <DropdownMenuItem onClick={openCreateWorkspaceModal} className='cursor-pointer'>
                    <Pencil className='size-4 mr-2 h-10' />
                    Create Workspace
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                    <Settings className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                    <LogOutIcon className='size-4 mr-2 h-10' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};