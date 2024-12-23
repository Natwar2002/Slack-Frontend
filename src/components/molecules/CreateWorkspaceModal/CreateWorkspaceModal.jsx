import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '@/hooks/apis/workspaces/useCreateWorkspace';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';


export const CreateWorkspaceModal = () => {

    const queryClient = useQueryClient();
    const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
    const [workspaceName, setWorkspaceName] = useState('');
    const navigate = useNavigate();
    const { isPending, createWorkspaceMutation } = useCreateWorkspace();

    function handleClose() {
        setOpenCreateWorkspaceModal(false);
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            const data = await createWorkspaceMutation({ name: workspaceName });
            console.log(data);
            navigate(`/workspaces/${data._id}`);
            queryClient.invalidateQueries('fetchWorkspaces');
        } catch (error) {
            console.log('Not able to create a new workspace', error);
        } finally {
            setWorkspaceName('');
            setOpenCreateWorkspaceModal(false);
        }
    }

    return (
        <Dialog open={openCreateWorkspaceModal} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new workspace</DialogTitle>
                    <DialogDescription>
                        Enter a unique name for your workspace to get started.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input 
                        required
                        minLength={3}
                        placeholder="Enter the name of your workspace, e.g., MyWorkspace, Dev Worksapce etc."
                        value={workspaceName}
                        disabled={isPending}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                    <div className='flex justify-end mt-5'>
                        <Button disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Workspace'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};