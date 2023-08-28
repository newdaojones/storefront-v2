import Link from "next/link";
import DataExport from "./data-export";

type Order = {
    orders: any;
};

export default function PaymentButtons({ orders }: Order) {

    return (
        <div className="grid grid-cols-2 space-x-12">
            <div className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-white content-center bg-violet-500 hover:bg-pink-500 md:w-36">
                <DataExport data={orders} />
            </div>
            <Link href="/protected/payments">
                <button className="grid grid-cols-1 w-full p-4 h-12 justify-items-center rounded-md text-white content-center bg-violet-500 hover:bg-pink-500 md:w-36">Refresh</button>
            </Link>
        </div>
    )
}