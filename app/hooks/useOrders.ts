import { Order } from '@prisma/client';
import queryString from 'query-string';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoading } from './useLoading';
import { usePagination } from './usePagination';

export const useOrders = (merchantId: number | null, dateRange: { startDate: Date | null, endDate: Date | null }) => {
    const [orders, setOrders] = useState<Array<Order>>([]);
    const { loading, setLoading } = useLoading();
    const { page, total, setTotal, limit } = usePagination();

    const getOrders = useCallback(async () => {
        if (!merchantId) {
            return;
        }
        try {
            setLoading(true);
            const startDateStr = dateRange.startDate?.toISOString();
            const endDateStr = dateRange.endDate?.toISOString();

            const query = queryString.stringify({
                page,
                limit,
                startDate: startDateStr,
                endDate: endDateStr,
            });

            const response = await fetch(`/api/order?${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log("Fetched orders:", result);  // Log the fetched data

            if (response.ok) {
                setOrders(prevOrders => prevOrders.concat(result.rows));
                setTotal(result.count);
            } else {
                throw new Error(result.message || result.error);
            }
        } catch (err: any) {
            // TODO: Improve error handling
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }, [page, limit, dateRange, merchantId, setLoading, setTotal]);

    return { orders, loading, total, getOrders };
};