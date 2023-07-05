// types/next-auth.d.ts

import 'next-auth'

declare module 'next-auth' {
    interface Session {
        role?: string
        userId?: string
    }

    interface User {
        role?: string
        id?: string
    }
}
