import { useQueryClient } from '@tanstack/react-query';
import { LoaderIcon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';
import { useGetChannelMessages } from '@/hooks/apis/channels/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';

export const Channel = () => {

    const queryClient = useQueryClient();
    const { joinChannel } = useSocket();
    const { channelId } = useParams();
    const { channelDetails, isFetching, isError } = useGetChannelById(channelId);
    const { messages, isSuccess } = useGetChannelMessages(channelId);
    const { setMessageList, messageList } = useChannelMessages();
    const messageListContainerRef = useRef(null);

    useEffect(()=>{
        if(!isFetching && !isError) {
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(()=> {
        console.log('ChannelId', channelId);
        queryClient.invalidateQueries('getPaginatedMessages');
    }, [queryClient, channelId]);

    useEffect(() => {
        if(isSuccess) {
            console.log('Messages fetched successfully');
            setMessageList(messages);
        }
    }, [isSuccess, messages, setMessageList]);

    useEffect(() => {
        if(messageListContainerRef.current) {
            messageListContainerRef.current.scrollTop = messageListContainerRef.current.scrollHeight;
        }
    }, [messageList]);

    if(isFetching){
        return(
            <div className='h-full flex-1 flex items-center justify-center'>
                <LoaderIcon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if(isError) {
        return(
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel not found</span>
            </div>
        );
    }

    return(
        <div className='flex flex-col h-full'>
            <ChannelHeader name={channelDetails?.name} />

            <div className='flex-1 overflow-y-auto p-5 gap-y-2' ref={messageListContainerRef}>
                {messageList?.map((message) => {
                    return <Message 
                                key={message?._id} 
                                body={message?.body} 
                                authorImage={message?.senderId?.avatar} 
                                authorName={message?.senderId?.username} 
                                createdAt={message?.createdAt || 'Just now'}
                                image={message?.image}
                            />;
                })}
            </div>

            <ChatInput />
        </div>
    );
};