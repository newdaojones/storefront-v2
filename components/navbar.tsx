"use client"

import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className="fixed bottom-20 w-full bg-opacity-100"> {/* Use the bottom property to float up from the bottom */}
            <div className="max-w-screen-lg mx-auto py-2 flex justify-between items-center">
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/main/orders')}> {/* Add some margin and shadow for a distinct look */}
                    Orders
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/main/ledger')}>
                    Ledger
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/main/gateways')}>
                    Gateways
                </button>
                <button className="mx-1 px-8 py-2 bg-gray-700 shadow-md border border-transparent rounded-md text-white " type="button" onClick={() => router.push('/protected/main/settings')}>
                    Settings
                </button>
            </div>
        </div>
    )

    // NAVBAR TABS ON A RADIUS -> NOT YET THE ORBITAL
    // return (
    //     <div className="fixed bottom-20 flex justify-center w-full">
    //         <div className="relative w-80 h-80">
    //             <button className="nav-button" type="button" onClick={() => router.push('/protected/main/orders')}>
    //                 Orders
    //             </button>
    //             <button className="nav-button" type="button" onClick={() => router.push('/protected/main/ledger')}>
    //                 Ledger
    //             </button>
    //             <button className="nav-button" type="button" onClick={() => router.push('/protected/main/gateways')}>
    //                 Gateways
    //             </button>
    //             <button className="nav-button" type="button" onClick={() => router.push('/protected/main/settings')}>
    //                 Settings
    //             </button>
    //         </div>
    //     </div>
    // );
}
