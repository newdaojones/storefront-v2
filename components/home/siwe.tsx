"use client"

import { useWalletConnectClient } from "@/app/providers/walletconnect";
import { Login } from "./connectQrCode";

const Siwe = () => {
    return (
        <main className="">
            <SiweContext />
        </main>
    );
};

const SiweContext = () => {
    const { isInitializing, isLoggedIn, disconnect, isLoading, isLoginInning } = useWalletConnectClient()
    if (isInitializing) {
        return (<p className="text-xl font-semibold text-gray-400">
            Securing connection...
        </p>)
    }

    if (isLoggedIn) {
        return (
            <button
                className="rounded-lg py-2 px-4 mt-2 bg-purps hover:border hover:border-ualert hover:bg-transparent"
                onClick={() => disconnect(true)}
            >
                Disconnect Wallet
            </button>
        )
    }

    if (isLoading || isLoginInning) {
        return (<p className="text-xl font-semibold text-gray-400">
            Loading...
        </p>)
    }

    return <Login />
}

export default Siwe;