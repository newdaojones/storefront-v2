// types/next-auth.d.ts

import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: AuthenticatedUser
    }

    interface User {
        id: number
        role: string | null
        merchant: Merchant | null
        operator: Operator | null
    }

    interface AuthenticatedUser extends User {
        token: JWT
    }

    interface Merchant {
        id: number
    }

    interface Operator {
        id: number
    }
}

