import Tooltip from "../generics/tooltip";

type ListItemProps = {
    order: any;
    statusColors: any;
};


export default function PaymentTooltipStatus({ order, statusColors }: ListItemProps) {
    const displayAmount = order.amount ? parseFloat(order.amount).toFixed(2) : "problem 😮‍💨";
    const finalAmount = order.chargeAmount ? parseFloat(order.chargeAmount).toFixed(2) : " ---";


    return (
        <Tooltip
            content={
                <div>
                    <div className="flex items-center">
                        <span className="text-green-500 py-1 mx-2">🟢</span> <span>Approved</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-yellow-500 py-1 mx-2">🟡</span> <span>Pending</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-red-500 py-1 mx-2">🔴</span> <span>Declined</span>
                    </div>
                </div>
            }
        >
            <div className="col-span-1">
                <p className={`text-sm font-semibold ${statusColors[order.status] || 'text-gray-500'}`}>${displayAmount}</p>
                <p className={`text-sm font-semibold ${statusColors[order.status] || 'text-gray-500'}`}>${finalAmount}</p>
            </div>
        </Tooltip>
    )
}