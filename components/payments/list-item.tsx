import React, { MouseEvent } from 'react';
import PaymentNameTooltip from './tooltip-payment-names';
import PaymentStatusTooltip from './tooltip-payment-status';

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

const PaymentListItem = ({ order, onMouseEnter, onMouseLeave, isFocused }: ListItemProps & { isFocused: boolean }) => {
    const createDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : null;
    const createTime = order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : null;

    const statusColors: StatusColors = {
        'paid': 'text-green-500',
        'pending': 'text-yellow-500',
        'error': 'text-red-500',
        'processing': 'text-orange-500',
    };


    return (
        <div className='w-152'>
            <div
                data-id={
                    `item-${order.id}`
                }
                className={
                    `grid grid-cols-4 w-full space-x-12 rounded-md px-2 py-2 justify-items-center
                    ${isFocused ? "bg-purps" : "bg-notpurple"}
                    ${isFocused ? "text-notpurple" : "text-gray-500"}`
                }
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="grid grid-rows-1">
                    <p className="text-sm font-semibold ">{order.id ?? "problem 😮‍💨"}</p>
                </div>
                <div className="grid grid-rows-2">
                    <p className="text-sm text-right font-semibold ">{createDate ?? "problem 😮‍💨"}</p>
                    <p className="text-sm text-right font-semibold ">{createTime ?? "problem 😮‍💨"}</p>
                </div>
                <PaymentNameTooltip order={order} />
                <PaymentStatusTooltip order={order} statusColors={statusColors} />
            </div>
        </div>
    )
};

const ListItem = React.memo(PaymentListItem);
ListItem.displayName = "ListItem";

export default ListItem;

