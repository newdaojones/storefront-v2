
// [...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// Wallectonnect and SIWE will use this route to authenticate users
// Drop email and phone from the user object

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "Sign In With Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signed Message", type: "text" }, // aka signature
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {
            return {
              id: siwe.address,
            }
          }
          return null
        } catch (e) {
          return null
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.address = token.sub;
      session.user = {
        ...(session.user || {}),
        token: token,
      };
      return session;
    },
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
