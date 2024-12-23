import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useToast } from '@/hooks/use-toast';

export const WorkspacePreferencesModal = () => {

    const { toast } = useToast();
    const [workspaceId, setWorkspaceId] = useState(null);

    const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

    function handleClose() {  
        setOpenPreferences(false);
    }

    useEffect(() => {
        setWorkspaceId(workspace?._id);
    }, [workspace]);

    async function handleDelete() {
        try {
            await deleteWorkspaceMutation();
            toast({
                title: 'Workspace delete succcessfully',
                message: 'Workspace delete succcessfully'
            });
        } catch (error) {
            console.log('Error in deleting workspace: ', error);
            toast({
                title: 'Error in deleting workspace',
                message: 'Error in deleting workspace',
            });
        }
    }

    return (
        <Dialog open={openPreferences} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{initialValue}</DialogTitle>
                </DialogHeader>

                <div className='px-4 pb-4 flex flex-col gap-y-2'>
                    <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
                        <div className='flex items-center justify-between'>
                            <p className='font-semibold text-sm'>
                                Workspace Name
                            </p>
                            <p className='font-semibold text-sm hover:underline'>
                                Edit
                            </p>
                        </div>
                        <p className='text-sm'>
                            {initialValue}
                        </p>
                    </div>
                    <button
                        onClick={handleDelete} 
                        className='flex items-center border gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50'
                    >
                        <TrashIcon className='size-5'/>
                        <p className='text-sm font-semibold'>
                            Delete Workspace 
                        </p>
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};