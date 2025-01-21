import CombineContext from '@/utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { ChannelMessagesProvider } from './channelMessages';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { SocketContextProvider } from './SocketContext';
import { WorkspaceContextProvider } from './WorkspaceContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';

export const AppContextProvider = CombineContext(
    ChannelMessagesProvider,
    SocketContextProvider,
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferencesModalContextProvider,
    CreateChannelContextProvider,
);