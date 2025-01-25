import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Message = ({ authorImage, authorName, createdAt, body }) => {

    const date = new Date(createdAt);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return(
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-center gap-2">
                <button>
                    <Avatar>
                        <AvatarImage className='rounded-md h-12 w-12' src={authorImage} />
                        <AvatarFallback className='rounded-md text-sm bg-sky-500 text-white'>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </button>

                <div className='flex flex-col w-full overflow-hidden'>
                    <div className='text-xs'>
                        <button className='font-bold text-primary hover:underline'>
                            {authorName}
                        </button>
                        <span>&nbsp;&nbsp;</span>
                        <button className='text-xs text-muted-foreground hover:underline'>
                            {formattedTime}
                        </button>
                    </div>

                    <MessageRenderer value={body} />
                    {/* Image goes here if there any */}

                </div>

            </div>
        </div>
    );
};