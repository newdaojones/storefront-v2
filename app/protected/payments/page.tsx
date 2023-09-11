"use client"
import { useOrders } from "@/app/hooks/useOrders";
import { useGlobal } from "@/app/providers/global-context";
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import PaymentButtons from "@/components/payments/buttons";
import PaymentList from "@/components/payments/list";
import CustomerDetails from "@/components/widgets/customer-details";
import DateRangePicker2 from "@/components/widgets/datepicker2";
import PaymentDetails from "@/components/widgets/payment-details";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDateRange } from "../../hooks/useDateRange";
import { endOfDay, startOfDay } from "date-fns";
export default function Payments() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <PaymentDataHook activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
    )
}

function PaymentDataHook({ activeWidget, setActiveWidget }: { activeWidget: string | null, setActiveWidget: (widget: string | null) => void }) {
    const { data: session } = useSession()
    const merchantId = session?.user?.merchantId ?? null;
    const defaultStartDate = startOfDay(new Date(2023, 0, 1)); // January 1, 2000
    const defaultEndDate = endOfDay(new Date());

    const { dateRange, handleDateRangeChange } = useDateRange(defaultStartDate, defaultEndDate);
    const { orders, loading, total, getOrders } = useOrders(merchantId, dateRange);
    const { hoveredItem } = useGlobal();

    useEffect(() => {
        getOrders(0)
    }, [getOrders])

    return (
        <div>
            <div className="grid grid-cols-2 space-x-135 space-y-32">
                <div className="grid grid-cols-1">
                    <Container title={"Payments"} footer={<PaymentButtons orders={orders} refreshOrders={() => getOrders(0)} />}>
                        <PaymentList
                            orders={orders}
                            loading={loading}
                            total={total}
                            loadMore={() => getOrders(orders.length)}
                            handleRefresh={() => {
                                console.log('handleRefresh called');
                            }}
                        />
                    </Container>
                </div>
                <div className="grid grid-cols-1 h-fit">
                    <PaymentDetails data={hoveredItem} />
                    <CustomerDetails data={hoveredItem} />
                </div>
            </div>
            <CommandBar
                slot1={'Date Range'}
                changeWidget={setActiveWidget}
            />
            <div className="absolute top-[40%] right-[82%]">
                {activeWidget === 'Date Range' && (
                    <DateRangePicker2
                        onChange={(startDate, endDate) => {
                            handleDateRangeChange(startDate, endDate);
                        }}
                        onClose={() => setActiveWidget(null)}
                    />
                )}
            </div>
        </div>
    )
}