"use client"
import React from 'react'
import AuthContext from './auth-context'
import { WalletConnectProvider } from './walletconnect'

type ProviderType = {
    children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
    return (
        <WalletConnectProvider>
            <AuthContext>{children}</AuthContext>
        </WalletConnectProvider>
    )
}

export default Providers