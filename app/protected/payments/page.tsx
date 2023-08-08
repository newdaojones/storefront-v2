"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import PaymentList from "@/components/payments/list";
import queryString from 'query-string';
import styles from '../../../components/payments/payments.module.css';
import DateRangePicker from "@/components/payments/datepicker";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { Order } from "@prisma/client";
import PaymentsHeader from "@/components/payments/header";
import { toast } from "react-hot-toast";
import FadeLoader from 'react-spinners/FadeLoader';
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<Array<Order>>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [limit] = useState(10);
    const [range, setRange] = useState<DateRange>({
        from: startOfDay(subDays(new Date(), 7)),
        to: endOfDay(new Date()),
    });
    const isDisabledPrev = useMemo(() => loading || page === 1, [page, loading])
    const isDisabledNext = useMemo(() => loading || page * limit >= total, [page, limit, total, loading])

    const onChangeRange = (value: DateRange) => {
        setRange(value)
        setPage(1)
    }

    const getOrders = useCallback(async () => {
        try {
            setLoading(true)
            setOrders([])
            const query = queryString.stringify({
                page,
                limit,
                range
            })
            const response = await fetch(`/api/order?${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json();

            if (response.ok) {
                setOrders(result.rows)
                setTotal(result.count)
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }, [page, limit, range])

    useEffect(() => {
        getOrders()
    }, [getOrders])

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <PaymentsHeader />
                <div className="flex justify-between">
                    <DateRangePicker disabled={loading} range={range} setRange={onChangeRange} />
                    <button className={styles.button} onClick={() => router.push('/protected/order')}>Create</button>
                </div>
                <div className={styles.rowContainer}>
                    <PaymentList orders={orders} />
                    {loading && (
                        <div className="flex items-center justify-center">
                            <FadeLoader color="black" />
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            disabled={isDisabledPrev}
                            onClick={() => setPage(page - 1)}
                            className={`border-2 rounded pl-4 pr-4 text-white ${isDisabledPrev ? 'bg-gray-400' : 'bg-purple-500'}`}
                        >{'<'}</button>
                        <button
                            disabled={isDisabledNext}
                            onClick={() => setPage(page + 1)}
                            className={`border-2 rounded pl-4 pr-4 text-white ${isDisabledNext ? 'bg-gray-400' : 'bg-purple-500'}`}
                        >{'>'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}