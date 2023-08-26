"use client"
import { useGlobal } from "@/app/providers/global-context";
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import PaymentButtons from "@/components/payments/buttons";
import { fetchLatestOrder } from "@/components/payments/data-refresh";
import PaymentList from "@/components/payments/list";
import CustomerDetails from "@/components/widgets/customer-details";
import DateRangePicker2 from "@/components/widgets/datepicker2";
import ResponseCodes from "@/components/widgets/payment-details";
import { Order } from "@prisma/client";
import { useSession } from "next-auth/react";
import queryString from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export default function Payments() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <PaymentDataHook activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
    )
}

function PaymentDataHook({ activeWidget, setActiveWidget }: { activeWidget: string | null, setActiveWidget: (widget: string | null) => void }) {
    const { data: session } = useSession()
    const { hoveredItem } = useGlobal();
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit] = useState(10);
    const [orders, setOrders] = useState<Array<Order>>([])

    const merchantId = useMemo(() => session?.user?.merchantId, [session])

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
        if (startDate && endDate) {
            const startDateStr = startDate.toISOString();
            const endDateStr = endDate.toISOString();
            console.log("Start Date:", startDateStr);
            console.log("End Date:", endDateStr);
        }
        setDateRange({ startDate, endDate });
    };

    const handleRefresh = async () => {
        console.log('handleRefresh called');
        const latestOrder = await fetchLatestOrder();

        if (latestOrder && (!orders.length || latestOrder.id !== orders[0].id)) {
            setOrders([latestOrder, ...orders]);
        }
    };

    const getOrders = useCallback(async () => {
        console.log('Fetching orders');
        if (!merchantId) {
            return
        }
        try {
            setLoading(true)
            const startDateStr = dateRange.startDate?.toISOString();
            const endDateStr = dateRange.endDate?.toISOString();

            const query = queryString.stringify({
                page,
                limit,
                startDate: startDateStr,
                endDate: endDateStr,
            })

            const response = await fetch(`/api/order?${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json();

            if (response.ok) {
                setOrders(prevOrders => prevOrders.concat(result.rows));
                setTotal(result.count);
            } else {
                throw new Error(result.message || result.error)
            }
        } catch (err: any) {
            // TODO: Improve error handling
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }, [page, limit, dateRange, merchantId])

    useEffect(() => {
        getOrders()
    }, [getOrders])


    return (
        <div className="relative w-screen h-screen">
            <Container title={"Payments"} footer={<PaymentButtons orders={undefined} />}>
                <PaymentList
                    orders={orders}
                    loading={loading}
                    total={total}
                    handleRefresh={handleRefresh}
                    loadMore={() => {
                        console.log('loadMore called');  // Debugging line
                        setPage(page + 1);
                    }}
                />
                {/* <Widget title="Payment Details"><ResponseCodes data={hoveredItem} /></Widget> */}
                {/* <Widget title="Customer Details"><CustomerDetails data={hoveredItem} /></Widget> */}
            </Container>
            <div className="absolute top-[35%] right-[76%]">
                <ResponseCodes data={hoveredItem} />
            </div>
            <div className="absolute top-[42%] right-[12%]">
                <CustomerDetails data={hoveredItem} />
            </div>
            <CommandBar
                slot1={'Date Range'}
                changeWidget={setActiveWidget}

            />
            <div className="absolute top-[18%] right-[12%]">
                {activeWidget === 'Date Range' && (
                    <DateRangePicker2
                        onChange={(startDate, endDate) => {
                            console.log("Start Date:", startDate);
                            console.log("End Date:", endDate);
                            handleDateRangeChange(startDate, endDate);
                        }}
                        onClose={() => setActiveWidget(null)}
                    />
                )}
            </div>
        </div>
    )
}