import { Order } from '@prisma/client';
import { useEffect, useMemo } from 'react';
import useInfiniteScroll from '../useInfiniteScroll';
import { useHoveredItem } from './hovered-context';
import ListItem from './list-item'; // Ensure the path to the list-item component is correct
import SkeletonListItem from './skeleton-list-item';

type ListProps = {
    orders: Order[];
    loading?: boolean;
    total?: number
    loadMore?: () => void
    handleRefresh: () => void
};

export default function PaymentList({ orders, loading = false, total = 0, loadMore, handleRefresh }: ListProps) {

    const { hoveredItem, setHoveredItem } = useHoveredItem();
    const isReached = useMemo(() => orders.length >= total, [orders, total])

    useEffect(() => {
        if (orders.length > 0) {
            setHoveredItem(orders[0]); // Assuming orders are sorted by most recent
        }
    }, [setHoveredItem, orders]);

    const [lastElementRef] = useInfiniteScroll(() => {
        if (isReached || loading || !loadMore) {
            return
        }

        loadMore()
    }, loading);

    // Optional: Set up an interval to auto-refresh the list every X seconds
    useEffect(() => {
        const intervalId = setInterval(handleRefresh, 10000); // Check every 10 seconds
        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [handleRefresh]);



    return (
        <div>
            <div className="grid grid-cols-4 pb-8 justify-items-center">
                <p><strong>Order ID</strong></p>
                <p><strong>Created @</strong></p>
                <p><strong>For Customer</strong></p>
                <p><strong>Amount</strong></p>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-80">
                {loading && !orders.length ? (
                    <>
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        {/* Add more skeletons as needed */}
                    </>
                ) : (
                    <>
                        {orders.map(order => (
                            <ListItem
                                key={order.id}
                                order={order}
                                isFocused={hoveredItem?.id === order.id}
                                onMouseEnter={(e) => setHoveredItem(order)}
                            //onMouseLeave={(e) => setHoveredItem(null)}
                            />
                        ))}
                    </>
                )}
                <div ref={lastElementRef} />
            </div>

        </div>
    );
}
