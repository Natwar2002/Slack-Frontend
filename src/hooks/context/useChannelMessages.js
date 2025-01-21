import { useContext } from 'react';

import ChannelMessages from '@/context/channelMessages';

export const useChannelMessages = () => {
    return useContext(ChannelMessages);
};