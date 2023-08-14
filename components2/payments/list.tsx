"use client"
import { useHoveredItem } from './hovered-context';
import ListItem from './list-item'; // Ensure the path to the list-item component is correct

type OrderData = {
    orderId: string;
    orderDate: string;
    orderStatus: string;
    orderAmount: string;
    orderCustomer: string;
}

type ListProps = {
    orders: OrderData[];
}

export default function PaymentList({ orders }: ListProps) {

    // This will relay the list item data being hovered to the response code widget
    const { setHoveredItem } = useHoveredItem();
    console.log(orders);

    return (
        <div className="space-y-2">
            {orders.map(order => (
                <ListItem
                    key={order.orderId}
                    orderId={order.orderId}
                    orderDate={order.orderDate}
                    orderStatus={order.orderStatus}
                    orderAmount={order.orderAmount}
                    orderCustomer={order.orderCustomer}
                    onMouseEnter={(e) => setHoveredItem(order)}
                    onMouseLeave={(e) => setHoveredItem(null)}
                />
            ))}
        </div>
    );
}
