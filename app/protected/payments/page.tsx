"use client"
import { useOrders } from "@/app/hooks/useOrders";
import { usePagination } from "@/app/hooks/usePagination";
import { useGlobal } from "@/app/providers/global-context";
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import PaymentButtons from "@/components/payments/buttons";
import PaymentList from "@/components/payments/list";
import CustomerDetails from "@/components/widgets/customer-details";
import DateRangePicker2 from "@/components/widgets/datepicker2";
import ResponseCodes from "@/components/widgets/payment-details";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDateRange } from "../../hooks/useDateRange";

export default function Payments() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);

    return (
        <PaymentDataHook activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
    )
}

function PaymentDataHook({ activeWidget, setActiveWidget }: { activeWidget: string | null, setActiveWidget: (widget: string | null) => void }) {
    const { data: session } = useSession()
    const merchantId = session?.user?.merchantId ?? null;
    const { dateRange, handleDateRangeChange } = useDateRange(null, null);
    const { orders, loading, total, getOrders } = useOrders(merchantId, dateRange);
    const { hoveredItem } = useGlobal();
    const { page, nextPage } = usePagination();

    useEffect(() => {
        getOrders()
    }, [getOrders])

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Payments"} footer={<PaymentButtons orders={orders} />}>
                <PaymentList
                    orders={orders}
                    loading={loading}
                    total={total}
                    handleRefresh={() => {
                        console.log('handleRefresh called');
                    }}
                // loadMore={() => {
                //     console.log('loadMore called');  // Debugging line
                //     nextPage();
                // }}
                />
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