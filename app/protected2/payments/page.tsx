"use client"
import CommandBar from "@/components/generics/command-bar";
import Container from "@/components/generics/container";
import Widget from "@/components/generics/widget";
import PaymentButtons from "@/components/payments2/buttons";
import { HoveredItemProvider, useHoveredItem } from "@/components/payments2/hovered-context";
import PaymentList from "@/components/payments2/list";
import Agent from "@/components/widgets2/agent";
import DateRangePicker from "@/components/widgets2/datepicker";
import ResponseCodes from "@/components/widgets2/response-codes";
import Shortcuts from "@/components/widgets2/shortcuts";
import { useState } from "react";

export default function Payments() {
    const [activeWidget, setActiveWidget] = useState<string | null>(null);


    return (
        <HoveredItemProvider>
            <ContentWithHook activeWidget={activeWidget} setActiveWidget={setActiveWidget} />
        </HoveredItemProvider>
    )
}

function ContentWithHook({ activeWidget, setActiveWidget }: { activeWidget: string | null, setActiveWidget: (widget: string | null) => void }) {
    const { hoveredItem } = useHoveredItem();
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({ startDate: null, endDate: null });

    const handleDateRangeChange = (startDate: Date, endDate: Date) => {
        setDateRange({ startDate, endDate });
    };

    return (
        <div className="relative w-screen h-screen">
            <Container title={"Payments"} footer={<PaymentButtons />}>
                <PaymentList orders={[
                    {
                        orderId: "12345",
                        orderDate: "2023-08-10",
                        orderStatus: "Paid",
                        orderAmount: "$100.00",
                        orderCustomer: "John Doe"
                    },
                    {
                        orderId: "54321",
                        orderDate: "2023-08-09",
                        orderStatus: "Pending",
                        orderAmount: "$150.00",
                        orderCustomer: "Jane Smith"
                    }
                ]} />
            </Container>
            <CommandBar
                slot1={'Status Codes'}
                slot2={'Date Range'}
                slot3={'Agent'}
                slot4={'Shortcuts'}
                changeWidget={setActiveWidget}
            />
            {activeWidget === 'Status Codes' && <Widget title="Codes"><ResponseCodes data={hoveredItem} /></Widget>}
            {activeWidget === 'Date Range' && <Widget title="Date Range"><DateRangePicker onChange={handleDateRangeChange} /></Widget>}
            {activeWidget === 'Agent' && <Widget title="Agent"><Agent viewType={"payments"} /></Widget>}
            {activeWidget === 'Shortcuts' && <Widget title="Shortcuts"><Shortcuts viewType={"payments"} /></Widget>}
        </div>
    )
}