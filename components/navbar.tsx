"use client"

import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="fixed bottom-20 w-full bg-opacity-100 grid place-items-center"> {/* Use the bottom property to float up from the bottom */}
            <div className="max-w-screen-lg mx-auto py-2 grid grid-cols-4 gap-4"> {/* Use CSS Grid to layout the buttons evenly */}
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/orders')}> {/* Add some margin and shadow for a distinct look */}
                    Orders
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/payments')}>
                    Payments
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/gateways')}>
                    Gateways
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/settings')}>
                    Settings
                </button>
            </div>
        </div>
    )

}
