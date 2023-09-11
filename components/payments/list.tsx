"use client"

import { useKeyboardInteraction } from '@/app/hooks/useKeyboardInteraction';
import { useMouseInteraction } from '@/app/hooks/useMouseInteraction';
import { usePagination } from '@/app/hooks/usePagination';
import { useGlobal } from '@/app/providers/global-context';
import { Order } from '@prisma/client';
import { useEffect, useMemo } from 'react';
import useInfiniteScroll from '../useInfiniteScroll';
import ListItem from './list-item'; // Ensure the path to the list-item component is correct
import SkeletonListItem from './skeleton-list-item';

type ListProps = {
    orders: Order[];
    loading?: boolean;
    total: number;
    index?: number;
    loadMore: () => void;
    handleRefresh: () => void
    disabled?: boolean;
};

export default function PaymentList({ orders, loading = false, total, loadMore, disabled = false }: ListProps) {
    const { activeComponent, setActiveComponent, hoveredItem, setHoveredItem, focusedIndex, setFocusedIndex } = useGlobal();
    const { isKeyboardMode, hoveredIndex, onMouseEnter, onMouseMove } = useMouseInteraction({ setHoveredItem });
    const onKeydown = useKeyboardInteraction(setFocusedIndex, orders.length, activeComponent, setActiveComponent, disabled);

    const isReached = useMemo(() => orders.length >= total, [orders, total])
    const actualFocusedIndex = isKeyboardMode ? focusedIndex : hoveredIndex;

    useEffect(() => {
        const handleEvents = () => {
            if (activeComponent === 'PaymentList') {
                window.addEventListener('keydown', onKeydown);
                window.addEventListener('mousemove', onMouseMove);
            } else {
                window.removeEventListener('keydown', onKeydown);
                window.removeEventListener('mousemove', onMouseMove);
            }
        };

        handleEvents();

        // Cleanup
        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [activeComponent, onKeydown, onMouseMove]);

    useEffect(() => {
        if (focusedIndex >= 0 && focusedIndex < orders.length) {
            setHoveredItem(orders[focusedIndex]);
        }
    }, [focusedIndex, setHoveredItem, orders]);

    const [lastElementRef] = useInfiniteScroll(() => {
        if (isReached || loading) {
            return
        }

        loadMore()
    }, loading);

    return (
        <div>
            <div className="grid grid-cols-4 pb-8 justify-items-center">
                <p><strong>Order ID</strong></p>
                <p><strong>Created @</strong></p>
                <p><strong>For Customer</strong></p>
                <p><strong>Amount</strong></p>
            </div>
            <div className="space-y-2 max-h-80">
                {orders.map((order, index) => (
                    <ListItem
                        key={order.id}
                        order={order}
                        isFocused={(hoveredItem?.id === order.id) || (actualFocusedIndex === index)}
                        onMouseEnter={() => onMouseEnter(index, order)}

                    />
                ))}
                {loading && (
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
                )}
                <div ref={lastElementRef} />
            </div>

        </div>
    );
}
