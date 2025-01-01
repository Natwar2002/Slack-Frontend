import { cva } from 'class-variance-authority';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { cn } from '@/lib/utils';

const userItemVariants = cva(
    'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481350]'
            }
        },
        defaultVariants: 'default'
    }
);

export const UserItem = ({ id, label = 'Member', image, variant = 'default' }) => {
    const { workspace } = useCurrentWorkspace();
    return (
        <Button
            className={cn(userItemVariants({variant}))}
            variant='transparent'
            size='sm'
            asChild
        >
            <Link to={`workspaces/${workspace?._id}/members/${id}`}>
                <Avatar>
                    <AvatarImage src={image} className='rounded-md' />
                    <AvatarFallback className='rounded-md bg-sky-500 text-white' >{label.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className='text-sm truncate'>{label}</span>
            </Link>
        </Button>
    );
};