"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import AuthContext from './auth-context'
import { GlobalProvider } from './global-context'
import { WalletConnectProvider } from './walletconnect'

type ProviderType = {
    children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
    return (
        <SessionProvider>
            <WalletConnectProvider>
                <AuthContext>
                    <GlobalProvider orders={[]}>
                        {children}
                    </GlobalProvider>
                </AuthContext>
            </WalletConnectProvider>
            <ToastContainer />
        </SessionProvider>
    )
}

export default Providers