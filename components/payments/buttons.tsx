import Link from "next/link";

export default function PaymentButtons() {

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-20">
            <Link href="/payments">
                <button className="w-24 p-4 h-12 flex justify-center items-center rounded-md bg-blue-300 hover:bg-violet-600 md:w-28 lg:w-32">Export</button>
            </Link>
            <Link href="/payments">
                <button className="w-24 p-4 h-12 flex justify-center items-center rounded-md bg-blue-300 hover:bg-violet-600 md:w-28 lg:w-32">Refresh</button>
            </Link>
        </div>
    )
}