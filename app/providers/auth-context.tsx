"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useWalletConnectClient } from "./walletconnect";

export interface AuthContextProps {
    children: React.ReactNode;
}

const publicPaths = [
    '/terms'
]

export default function AuthContext({ children }: AuthContextProps) {
    const { data: session } = useSession();
    const { isLoggedIn, disconnect } = useWalletConnectClient()
    const router = useRouter()
    const pathname = usePathname()

    const detectRoutes = useCallback(() => {
        console.log(isLoggedIn, session)
        if (!session) {
            if (!publicPaths.includes(pathname)) { // ignoring public path
                router.push('/')
            }

            if (isLoggedIn) {
                disconnect(true)
            }

            return
        }

        if (pathname === '/') {
            if (session.isNewUser || !session.user || session.user.role === "GUEST") {
                router.push('/protected/onboard')
            } else if (['MERCHANT', 'OPERATOR'].includes(session.user?.role || '')) {
                router.push('/protected/payments')
            }
        }
    }, [session, pathname, router, isLoggedIn, disconnect])

    useEffect(() => {
        detectRoutes()
    }, [detectRoutes])

    return <>{children}</>;
}