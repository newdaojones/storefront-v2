"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useWalletConnectClient } from "./walletconnect";
import { useAgreement } from "@/components/use/agreement";

export interface AuthContextProps {
    children: React.ReactNode;
}

const publicPaths = [
    '/terms'
]

export default function AuthContext({ children }: AuthContextProps) {
    useAgreement()
    const { data: session } = useSession();
    const { isLoggedIn, disconnect, isLoginInning, initialized } = useWalletConnectClient()
    const router = useRouter()
    const pathname = usePathname()

    const detectRoutes = useCallback(() => {
        if (pathname === '/agreement-accept') {
            return
        }

        console.log('-----------')
        console.log('isLoginInning', isLoginInning)
        console.log('initialized', initialized)
        console.log('session', !!session)
        console.log('isLoggedIn', isLoggedIn)
        console.log('==========')
        if (isLoginInning || !initialized) {
            return
        }

        if (!session) {
            if (!publicPaths.includes(pathname)) { // ignoring public path
                router.push('/')
            }

            if (isLoggedIn) {
                disconnect(true)
            }

            return
        }

        if (session && !isLoggedIn) {
            signOut()
        }

        const isOnboard = session?.isNewUser || session?.user.status !== 'VERIFIED' || session?.user.role === "GUEST"

        if (pathname === '/') {
            if (isOnboard) {
                router.push('/protected/onboard')
            } else if (['OWNER', 'OPERATOR'].includes(session.user?.role || '')) {
                router.push('/protected/payments')
            }
        } else if (isOnboard && pathname.startsWith('/protected') && !pathname.startsWith('/protected/onboard')) {
            router.push('/protected/onboard')
        }
    }, [session, pathname, router, isLoggedIn, disconnect, isLoginInning, initialized])

    useEffect(() => {
        detectRoutes()
    }, [detectRoutes])

    return <>{children}</>;
}