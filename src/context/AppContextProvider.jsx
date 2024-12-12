import CombineContext from '@/utils/CombineContext';

import { AuthContextProvider } from './AuthContext';

export const AppContextProvider = CombineContext(
    AuthContextProvider,
);