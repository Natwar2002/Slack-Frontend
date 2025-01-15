import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const Hint = ({ children, label, side, align }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>

                <TooltipContent 
                    side={side}
                    align={align}
                    className='bg-black text-white p-2 rounded-l border border-white/5'
                >
                    <p className='text-sm font-medium'>
                        { label }
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};