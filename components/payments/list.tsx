import { useGlobal } from '@/app/providers/global-context';
import { Order } from '@prisma/client';
import { useCallback, useEffect, useMemo } from 'react';
import useInfiniteScroll from '../useInfiniteScroll';
import ListItem from './list-item'; // Ensure the path to the list-item component is correct
import SkeletonListItem from './skeleton-list-item';

type ListProps = {
    orders: Order[];
    loading?: boolean;
    total?: number;
    index?: number;
    loadMore?: () => void
    handleRefresh: () => void
    disabled?: boolean;
};

export default function PaymentList({ orders, loading = false, total = 0, loadMore, handleRefresh, disabled = false }: ListProps) {

    const isReached = useMemo(() => orders.length >= total, [orders, total])
    const { activeComponent, setActiveComponent, hoveredItem, setHoveredItem, focusedIndex, setFocusedIndex, focused, setFocused } = useGlobal();

    const onKeydown = useCallback((e: KeyboardEvent) => {
        if (disabled) {
            return;
        }

        if (activeComponent === 'Orbital') {
            return; // Skip this handler if Orbital is active
        }

        if (e.code === 'Enter' && e.shiftKey) {
            return setActiveComponent('Orbital');
        }

        if (e.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, orders.length - 1));
        }

        if (e.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    }, [activeComponent, disabled, orders.length, setActiveComponent, setFocusedIndex]);

    useEffect(() => {
        if (activeComponent === 'PaymentList') {
            window.addEventListener('keydown', onKeydown);
        }
        return () => window.removeEventListener('keydown', onKeydown);
    }, [activeComponent, onKeydown]); // Added activeComponent in dependency list


    useEffect(() => {
        if (orders.length > 0) {
            setHoveredItem(orders[0]); // Assuming orders are sorted by most recent
        }
    }, [setHoveredItem, orders]);

    useEffect(() => {
        if (focusedIndex >= 0 && focusedIndex < orders.length) {
            setHoveredItem(orders[focusedIndex]);
        }
    }, [focusedIndex, orders, setHoveredItem]);

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
            <div className="space-y-2 max-h-80">
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
                        {orders.map((order, index) => (
                            <ListItem
                                key={order.id}
                                order={order}
                                isFocused={(hoveredItem?.id === order.id)}
                                onMouseEnter={(e) => {
                                    setHoveredItem(order);
                                    setFocusedIndex(index);
                                }}
                            />
                        ))}
                    </>
                )}
                <div ref={lastElementRef} />
            </div>

        </div>
    );
}
