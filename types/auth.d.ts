import { KycStatus } from '@prisma/client';
import 'next-auth';
import { JWT } from 'next-auth/jwt';

/**
 * The Credentials interface represents the data structure required for a user's
 * credentials when signing in with Ethereum in our application.
 *
 * @property {string} message - The message provided by the user.
 * @property {string} signature - The user's signed message.
 * @property {string} nonce - The nonce value.
 */
export interface Credentials {
    message: string;
    signature: string;
    nonce: string;
}

/**
 * Extends the next-auth module with custom properties.
 * We use this to augment the default types provided by next-auth.
 */
declare module 'next-auth' {

    /**
     * The Session interface represents the data structure for a user's session.
     *
     * @property {AuthenticatedUser} user - The authenticated user.
     */
    interface Session {
        user: AuthenticatedUser
        address: string
        isNewUser: boolean
    }

    /**
     * The User interface represents the basic structure for a user.
     *
     * @property {number} id - The user's ID.
     * @property {string } name - The user's role.
     * @property {string} email - The user's role.
     * @property {string} walletAddress - The user's role.
     * @property {KycStatus} status - The user's role.
     * @property {string} role - The user's role.
     * @property {boolean} isNewUser - The user's role.
     * @property {Merchant | null} merchant - Merchant information, if the user is a merchant.
     */

    interface User {
        id: number
        walletAddress: string
        name?: string
        email?: string
        status?: KycStatus
        role?: string | null
        merchant?: Merchant | null
        isNewUser?: boolean
        merchantId?: number
    }

    /**
     * The AuthenticatedUser interface represents the structure for a authenticated user.
     * It extends the User interface and includes the JWT token.
     *
     * @property {JWT} token - The user's JSON Web Token.
     */
    interface AuthenticatedUser extends User {
        token: JWT
    }

    /**
     * The Merchant interface represents the basic structure for a merchant.
     *
     * @property {number} id - The merchant's ID.
     */
    interface Merchant {
        id: number
        name: string
        walletAddress: string
    }

    /**
     * The Operator interface represents the basic structure for an operator.
     *
     * @property {number} id - The operator's ID.
     */
    interface Operator {
        id: number
    }
}

// Declare MyJWT interface in 'next-auth/jwt' module
declare module 'next-auth/jwt' {
    /**
     * The MyJWT interface represents the data structure for the user's token.
     *
     * @property {AuthenticatedUser} user - The authenticated user.
     * @property {string} address - The user's Ethereum address.
     * @property {boolean} isNewUser - Indicates if the user is new or not.
     */
    interface MyJWT extends JWT {
        user: AuthenticatedUser;
        address: string;
        isNewUser: boolean;
    }
}
