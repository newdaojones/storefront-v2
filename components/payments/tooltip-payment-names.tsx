import Tooltip from "../generics/tooltip";

type ListItemProps = {
    order: any;
};

const doNamesMatch = (customerName: string, payerName: string) => {
    const cleanedCustomerName = customerName.replace(/\s+/g, '').toLowerCase();
    const cleanedPayerName = payerName.replace(/\s+/g, '').toLowerCase();
    return cleanedCustomerName === cleanedPayerName;
};


export default function PaymentNameTooltip({ order }: ListItemProps) {
    const customerName = `${order?.firstName ?? ''}${order?.lastName ?? ''}`;
    const payerName = `${order.customer?.firstName ?? ''}${order.customer?.lastName ?? ''}`;
    const namesMatch = doNamesMatch(customerName, payerName);


    const tooltipContent = (
        <div>
            {namesMatch ? (
                <div className="flex items-center">
                    <span className="py-1 mx-2">🟢</span> <span>Matched</span>
                </div>
            ) : (
                <div className="flex items-center">
                    <span className="py-1 mx-2">🟡</span> <span>Unmatched</span>
                </div>
            )}
        </div>
    );

    const textColorClass = namesMatch ? 'text-gray-500' : 'text-gray-500 focus:text-notpurple hover"text-notpurple';

    return (
        <Tooltip content={tooltipContent}>
            <div className="col-span-1">
                <p className="text-sm font-semibold ">{order?.firstName ?? "-"} {order?.lastName ?? ''}</p>
                <p className="text-sm text-right font-semibold ">{order.customer?.firstName ?? "-"} {order.customer?.lastName ?? ''}</p>
            </div>
            {/* <div className="col-span-1">
                <p className={`text-sm font-semibold ${textColorClass || 'text-gray-500'}`}>{customerName}</p>
                <p className={`text-sm font-semibold ${textColorClass || 'text-gray-500'}`}>{payerName}</p>
            </div> */}
        </Tooltip>
    )
}