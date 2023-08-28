import React from 'react';

type TooltipProps = {
    children: React.ReactNode,
    content: React.ReactNode, // changed from 'text: string' to 'content: React.ReactNode'
};

export default function Tooltip({ children, content }: TooltipProps) {
    return (
        <div className="relative inline-block group">
            {children}
            <div className="flex flex-col w-28 absolute text-xs bg-lamegray bg-opacity-50 text-charyo p-1 rounded z-10 left-1/2 transform -translate-x-1/2 invisible group-hover:visible">
                {content}
            </div>
        </div>
    );
}


