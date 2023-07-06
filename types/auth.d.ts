// types/next-auth.d.ts

import 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        address?: string
        user: AuthenticatedUser

    }

    interface User {
        id: string
        wallet?: string
    }

    interface AuthenticatedUser extends User {
        token: JWT
    }
}
