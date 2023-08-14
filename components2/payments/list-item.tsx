import { MouseEvent } from 'react';

type ListItemProps = {
    orderId: string;
    orderDate: string;
    orderStatus: string;
    orderAmount: string;
    orderCustomer: string;
    onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;

}

type StatusColors = {
    [key: string]: string;
    Paid: string;
    Pending: string;
    Failed: string;
    Canceled: string;
};

export default function ListItem({ orderId, orderDate, orderStatus, orderAmount, orderCustomer, onMouseEnter, onMouseLeave }: ListItemProps) {

    const displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const statusColors: StatusColors = {
        'Paid': 'text-green-500',
        'Pending': 'text-yellow-500',
        'Failed': 'text-red-500',
        'Canceled': 'text-gray-500',
    };

    return (
        <div className="grid grid-cols-5 gap-4 w-full rounded-md px-1 py-1 justify-items-center hover:bg-violet-300"

            // This will relay the list item data being hovered to the response code widget
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{orderId}</p>
            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{displayDate}</p>
            </div>
            <div className="col-span-1">
                <p className={`text-sm font-semibold ${statusColors[orderStatus] || 'text-gray-500'}`}>{orderStatus}</p>
            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{orderAmount}</p>
            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{orderCustomer}</p>

            </div>
        </div>
    )
}
