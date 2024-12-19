import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';

export const WorkspacePanelHeader = ({ workspace }) => {

    const workspaceMembers = workspace?.members;
    const { auth } = useAuth();
    const isLoggedInUserAdminOfWorkspace = workspaceMembers?.find(member => member.memberId._id === auth?.user?._id && member.role === 'admin');

    console.log(auth.user._id);
    
    console.log(isLoggedInUserAdminOfWorkspace);
    
    return (
        <div className="flex items-center justify-between px-4 h-[50px] gap-0.5">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant='transparent'
                         className='font-semibold text-lg w-auto p-1.5 overflow-hidden'
                    >
                        <span className='truncate'>
                            {workspace?.name}
                        </span>
                        <ChevronDownIcon className='size-5 ml-1' />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent side='bottom' align='start' className='w-64'>
                    <DropdownMenuItem>
                        <div className='size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]'>
                            { workspace?.name.charAt(0).toUpperCase() }
                        </div>

                        <div className='flex flex-col items-start'>
                            <p className='font-bold'>{workspace?.name}</p>
                            <p className='text-xs text-muted-foreground'>(Active Workspace)</p>
                        </div>
                    </DropdownMenuItem>

                    {isLoggedInUserAdminOfWorkspace && (
                        <>
                            <DropdownMenuItem className='cursor-pointer py-2'>
                                Prefrences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer py-2'>
                                Invite People to {workspace?.name}
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Todo: Add tooltip */}
            <div className='flex items-center gap-0.5'>
                <Button variant='transparent' size='iconSm'>
                    <ListFilterIcon size={5} />
                </Button>
                <Button variant='transparent' size='iconSm'>
                    <SquarePenIcon size={5} />
                </Button>
            </div>
        </div>
    );
};