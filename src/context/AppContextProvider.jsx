import CombineContext from '@/utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';

export const AppContextProvider = CombineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferencesModalContextProvider,
);