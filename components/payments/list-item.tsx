import { MouseEvent } from 'react';

type ListItemProps = {
    order: any;
    onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
};

type StatusColors = {
    [key: string]: string;
    paid: string;
    pending: string;
    error: string;
    processing: string;
};

export default function ListItem({ order, onMouseEnter, onMouseLeave }: ListItemProps) {
    const total = (order.amount + order.tipAmount + order.networkFee + order.serviceFee + order.taxFee).toFixed(2);

    const displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const statusColors: StatusColors = {
        'paid': 'text-green-500',
        'pending': 'text-yellow-500',
        'error': 'text-red-500',
        'processing': 'text-orange-500',
    };

    return (
        <div className="grid grid-cols-5 gap-10 w-full rounded-md px-1 py-1 justify-items-center hover:bg-violet-300"

            // This will relay the list item data being hovered to the response code widget
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{order.id}</p>
                <p className="text-sm font-semibold text-gray-500">{order.id}</p>

            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{displayDate}</p>
                <p className="text-sm font-semibold text-gray-500">{displayDate}</p>
            </div>
            <div className="col-span-1">
                <p className={`text-sm font-semibold ${statusColors[order.status] || 'text-gray-500'}`}>{total}</p>
                <p className={`text-sm font-semibold ${statusColors[order.status] || 'text-gray-500'}`}>{total}</p>

            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{order.customer?.firstName} {order.customer?.lastName}</p>
                <p className="text-sm font-semibold text-gray-500">{order.customer?.firstName} {order.customer?.lastName}</p>


            </div>
        </div>
    )
}
