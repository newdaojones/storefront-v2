"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import AuthContext from './auth-context'
import { GlobalProvider } from './global-context'
import { WalletConnectProvider } from './walletconnect'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'

type ProviderType = {
    children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
    return (
        <SessionProvider>
            <ApolloProvider client={apolloClient}>
                <WalletConnectProvider>
                    <AuthContext>
                        <GlobalProvider orders={[]}>
                            {children}
                        </GlobalProvider>
                    </AuthContext>
                </WalletConnectProvider>
            </ApolloProvider>
            <ToastContainer />
        </SessionProvider>
    )
}

export default Providers