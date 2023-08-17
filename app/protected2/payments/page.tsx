"use client"
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import PaymentButtons from "@/components/payments/buttons";
import { HoveredItemProvider, useHoveredItem } from "@/components/payments/hovered-context";
import PaymentList from "@/components/payments/list2";
import CustomerDetails from "@/components/widgets/customer-details";
import DateRangePicker from "@/components/widgets/datepicker";
import ResponseCodes from "@/components/widgets/payment-details";
import { Order } from "@prisma/client";
import queryString from "query-string";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Payments() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);


    return (
        <HoveredItemProvider>
            <PaymentDataHook activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
        </HoveredItemProvider>
    )
}

function PaymentDataHook({ activeWidget, setActiveWidget }: { activeWidget: string | null, setActiveWidget: (widget: string | null) => void }) {
    const { hoveredItem } = useHoveredItem();
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit] = useState(10);

    const [orders, setOrders] = useState<Array<Order>>([])

    const handleDateRangeChange = (startDate: Date, endDate: Date) => {
        setDateRange({ startDate, endDate });
    };

    const getOrders = useCallback(async () => {
        try {
            setLoading(true)
            setOrders([])
            const query = queryString.stringify({
                page,
                limit,
                dateRange
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
    }, [page, limit, dateRange])

    useEffect(() => {
        getOrders()
    }, [getOrders])

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Payments"} footer={<PaymentButtons />}>
                <PaymentList orders={orders} />
            </Container>
            <CommandBar
                slot1={'Payment Details'}
                slot2={'Date Range'}
                slot3={'Customer Details'}
                changeWidget={setActiveWidget}
            />
            {activeWidget === 'Payment Details' && <Widget title="Payment Details"><ResponseCodes data={hoveredItem} /></Widget>}
            {activeWidget === 'Date Range' && <Widget title="Date Range"><DateRangePicker onChange={handleDateRangeChange} /></Widget>}
            {activeWidget === 'Customer Details' && <Widget title="Customer Details"><CustomerDetails data={hoveredItem} /></Widget>}
        </div>
    )
}