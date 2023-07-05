"use client"
import React from 'react'
import AuthContext from './auth-context'
import WagmiProvider from './wagmi'

type ProviderType = {
    children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
    return (
        <WagmiProvider>
            <AuthContext>{children}</AuthContext>
        </WagmiProvider>
    )
}

export default Providers