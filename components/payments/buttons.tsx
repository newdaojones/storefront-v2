import Link from "next/link";
import DataExport from "./data-export";

type Order = {
    orders: any;
    refreshOrders: () => void;
};

export default function PaymentButtons({ orders, refreshOrders }: Order) {

    return (
        <div className="grid grid-cols-2 space-x-12">
            <div className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">
                <DataExport data={orders} />
            </div>
            <Link href="/protected/payments">
                <button onClick={refreshOrders} className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-notpurple content-center bg-purps hover:bg-ualert md:w-36">Refresh</button>
            </Link>
        </div>
    )
}