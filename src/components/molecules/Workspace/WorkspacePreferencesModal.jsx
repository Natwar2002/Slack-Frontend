import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/hooks/apis/workspaces/useUpdateWorkspace';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';

export const WorkspacePreferencesModal = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [workspaceId, setWorkspaceId] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
    const [renameValue, setRenameValue] = useState(workspace?.name);
    const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
    const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

    const { confirmation, ConfirmDialog } = useConfirm({ title: 'Do you want to delete the workspace?', message: 'This action can not be undone.' });
    const { confirmation: updateConfirmaion, ConfirmDialog: UpdateDialog } = useConfirm({ title: 'Do you want to Update the workspace?', message: 'This action can not be undone.' });


    function handleClose() {  
        setOpenPreferences(false);
    }

    useEffect(() => {
        setWorkspaceId(workspace?._id);
        setRenameValue(workspace?.name);
    }, [workspace]);

    async function handleDelete() {
        try {
            const ok = await confirmation();
            console.log('Confirmation received');
            if(!ok) return;
            await deleteWorkspaceMutation();
            navigate('/home');
            queryClient.invalidateQueries('fetchWorkspaces');
            setOpenPreferences(false);
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

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            const ok = await updateConfirmaion();
            console.log('Confirmation received');
            if(!ok) return;
            await updateWorkspaceMutation(renameValue);
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
            setOpenPreferences(false);
            toast({
                title: 'Workspace Updated successfully',
                type: 'success'
            });
        } catch (error) {
            console.log('Error in updating workspace', error);
            toast({
                title: 'Error in updating workspace',
                type: 'error'
            });
        }
    }

    return (
        <>
            <ConfirmDialog />
            <UpdateDialog />
            <Dialog open={openPreferences} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{initialValue}</DialogTitle>
                    </DialogHeader>

                    <div className='px-4 pb-4 flex flex-col gap-y-2'>
                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                            <DialogTrigger>
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
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Rename Workspace</DialogTitle>
                                </DialogHeader>

                                <form className='space-y-4' onSubmit={handleFormSubmit}>
                                    <Input  
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        required
                                        autofocus
                                        minLength={3}
                                        maxLength={50}
                                        disabled={isPending}
                                        placeholder='Workspace name e.g. Design Team'
                                    />
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button
                                                variant='outline'
                                                disabled={isPending}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            type='submit'
                                            disabled={isPending}
                                        >
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>

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
        </>
    );
};