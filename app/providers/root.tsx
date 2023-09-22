"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import AuthContext from './auth-context'
import { GlobalProvider } from './global-context'
import { WalletConnectProvider } from './walletconnect'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'
import { Session } from 'next-auth'

type ProviderType = {
    children: React.ReactNode
    session: Session | null
}

const Providers = ({ children, session }: ProviderType) => {
    return (
        <SessionProvider session={session}>
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