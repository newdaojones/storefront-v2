// SkeletonListItem.tsx
import React from 'react';

const SkeletonListItem: React.FC = () => {
    return (
        <div className="grid grid-cols-4 gap-12 w-full rounded-md px-2 py-2 justify-items-center bg-slate-50">
            <div className="col-span-1">
                <div className="skeleton h-4 w-24 rounded"></div>
            </div>
            <div className="col-span-1">
                <div className="skeleton h-4 w-24 rounded"></div>
            </div>
            <div className="col-span-1">
                <div className="skeleton h-4 w-24 rounded"></div>
            </div>
            <div className="col-span-1">
                <div className="skeleton h-4 w-24 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonListItem;

// Add some CSS for skeleton
