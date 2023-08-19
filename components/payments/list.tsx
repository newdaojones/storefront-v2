import { Order } from '@prisma/client';
import React, { useMemo } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import useInfiniteScroll from '../useInfiniteScroll';
import { fetchLatestOrder } from './data-refresh';
import { useHoveredItem } from './hovered-context';
import ListItem from './list-item'; // Ensure the path to the list-item component is correct

type ListProps = {
    orders: Order[];
    loading?: boolean;
    total?: number
    loadMore?: () => void
};

export default function PaymentList({ orders, loading = false, total = 0, loadMore }: ListProps) {

    const isReached = useMemo(() => orders.length >= total, [orders, total])
    // This will relay the list item data being hovered to the response code widget
    const { setHoveredItem } = useHoveredItem();

    const [lastElementRef] = useInfiniteScroll(() => {
        if (isReached || loading || !loadMore) {
            return
        }

        loadMore()
    }, loading);

    const handleRefresh = async () => {
        const latestOrder = await fetchLatestOrder();

        if (latestOrder && (!orders.length || latestOrder.id !== orders[0].id)) {
            // If there's a new order, prepend it to the list.
            // Here, we assume orders are sorted in descending order by their creation date or ID.
            orders.unshift(latestOrder);
            // Update your state accordingly.
        }
    };

    // Optional: Set up an interval to auto-refresh the list every X seconds
    React.useEffect(() => {
        const intervalId = setInterval(handleRefresh, 10000); // Check every 10 seconds
        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [orders]);



    return (
        <div>
            <div className="grid grid-cols-4 pb-4 justify-items-center">
                <p><strong>Order ID</strong></p>
                <p><strong>Time</strong></p>
                <p><strong>Order</strong></p>
                <p><strong>Customer</strong></p>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-80">
                {orders.map(order => (
                    <ListItem
                        key={order.id}
                        order={order}
                        onMouseEnter={(e) => setHoveredItem(order)}
                        onMouseLeave={(e) => setHoveredItem(null)}
                    />
                ))}
                {loading && (
                    <div className="flex items-center justify-center">
                        <FadeLoader color="black" />
                    </div>
                )}
                <div ref={lastElementRef} />
            </div>

        </div>
    );
}
