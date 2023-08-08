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

        if (pathname === '/') {
            if (session?.isNewUser || session?.user.status !== 'VERIFIED' || session?.user.role === "GUEST") {
                router.push('/protected/onboard')
            } else if (['OWNER', 'OPERATOR'].includes(session.user?.role || '')) {
                router.push('/protected/payments')
            }
        }
    }, [session, pathname, router, isLoggedIn, disconnect, isLoginInning, initialized])

    useEffect(() => {
        detectRoutes()
    }, [detectRoutes])

    return <>{children}</>;
}