// [...nextauth]/route.ts
import prisma from "@/lib/prisma";
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
          console.log("Did it work", siwe.address)

          if (result.success) {
            const user = await prisma.user.findUnique({
              where: { walletAddress: siwe.address },
              include: {
                merchant: true,
                operator: true,
              },
            })

            if (!user) {
              const newUser = await prisma.user.create({
                data: {
                  walletAddress: siwe.address,
                  role: "GUEST",
                },
                include: {
                  merchant: true,
                  operator: true,
                },
              })
              return {
                id: newUser.id,
                wallet: newUser.walletAddress,
                role: newUser.role,
                merchant: newUser.merchant ? { id: newUser.merchant.id } : null,
                operator: newUser.operator ? { id: newUser.operator.id } : null,
              }
            }

            return {
              id: user.id,
              wallet: user.walletAddress,
              role: user.role,
              merchant: user.merchant,
              operator: user.operator,
            }
          }

          return null
        } catch (e) {
          console.error(e)
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
        token.sub = user.id.toString();
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.sub === undefined) {
        throw new Error("token.sub is undefined");
      }
      session.user = {
        ...(session.user || {}),
        id: parseInt(token.sub),
        role: user ? user.role : null, // <-- Add a check for undefined here
        merchant: user ? user.merchant : null, // <-- And here
        operator: user ? user.operator : null, // <-- And here
        token: token,
      }
      return session;
    },

  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
