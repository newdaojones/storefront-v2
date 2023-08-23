import React, { MouseEvent } from 'react';
import PaymentTooltipStatus from './tooltip-payment-status';

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

const PaymentListItem = ({ order, onMouseEnter, onMouseLeave }: ListItemProps) => {
    const total = (order.amount + order.tipAmount + order.networkFee + order.serviceFee + order.taxFee).toFixed(2);
    //const displayAmount = order.amount ? parseFloat(order.amount).toFixed(2) : "problem 😮‍💨";


    //const displayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const createDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : null;
    const createTime = order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : null;

    const statusColors: StatusColors = {
        'paid': 'text-green-500',
        'pending': 'text-yellow-500',
        'error': 'text-red-500',
        'processing': 'text-orange-500',
    };

    return (
        <div className="grid grid-cols-4 gap-20 w-full rounded-md px-2 py-2 justify-items-center bg-slate-50 hover:bg-violet-300"

            // This will relay the list item data being hovered to the response code widget
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{order.id ?? "problem 😮‍💨"}</p>
            </div>
            <div className="col-span-1">
                <p className="text-sm text-right font-semibold text-gray-500">{createDate ?? "problem 😮‍💨"}</p>
                <p className="text-sm text-right font-semibold text-gray-500">{createTime ?? "problem 😮‍💨"}</p>
            </div>
            <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500">{order.customer?.phoneNumber ?? ''}</p>
                <p className="text-sm text-right font-semibold text-gray-500">{order.customer?.firstName ?? "-"} {order.customer?.lastName ?? ''}</p>
            </div>
            <PaymentTooltipStatus order={order} statusColors={statusColors} />
        </div>
    )
};

const ListItem = React.memo(PaymentListItem);
ListItem.displayName = "ListItem";

export default ListItem;
