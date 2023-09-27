"use client"

import { useWalletConnectClient } from "@/app/providers/walletconnect";
import { Login } from "./connectQrCode";
import { sendLog } from "@/lib/log";

const Siwe = () => {
    return (
        <main className="">
            <SiweContext />
        </main>
    );
};

const SiweContext = () => {
    const { isInitializing, isLoggedIn, disconnect, isLoading, isLoginInning } = useWalletConnectClient()

    const onDisconnect = () => {
        sendLog({
            message: 'User clicked disconnect on siwe context'
        })
        disconnect(true)
    }

    if (isInitializing) {
        return (<p className="text-xl font-semibold text-gray-400">
            Securing connection...
        </p>)
    }

    if (isLoggedIn) {
        return (
            <button
                className="rounded-lg py-2 px-4 mt-2 bg-purps hover:border hover:border-ualert hover:bg-transparent"
                onClick={() => onDisconnect()}
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