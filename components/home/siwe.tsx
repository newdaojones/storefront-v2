"use client"

import React from "react";
import { Login } from "./login";
import { useWalletConnectClient } from "@/app/_providers/walletconnect";


const Siwe = () => {
    const { isInitializing } = useWalletConnectClient()

    if (isInitializing) {

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <SwieContext />
        </main>
    );
};

const SwieContext = () => {
    const { isInitializing, isLoggedIn, disconnect, isLoading } = useWalletConnectClient()
    if (isInitializing) {
        return (<p className="text-xl font-semibold text-gray-400">
            Initializing...
        </p>)
    }

    if (isLoggedIn) {
        return (
            <button
                className="rounded-lg py-2 px-4 mt-2 bg-yellow-400 hover:border hover:border-orange-700 hover:bg-transparent"
                onClick={() => disconnect(true)}
            >
                Disconnect Wallet
            </button>
        )
    }

    if (isLoading) {
        return (<p className="text-xl font-semibold text-gray-400">
            Loading...
        </p>)
    }

    return <Login />
}

export default Siwe;