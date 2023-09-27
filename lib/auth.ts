import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { Credentials } from "types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In With Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signed Message", type: "text" },
        nonce: { label: "Nonce", type: "text" },
      },
      async authorize(credentials: Credentials | undefined, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          console.log("siwe.address:", siwe.address);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            nonce: credentials?.nonce,
          })
          console.log("siwe.nonce:", siwe.nonce);

          if (!result.success) {
            console.error("SIWE verification failed")
            return null
          }

          const user = await prisma.user.findUnique({
            where: { walletAddress: siwe.address },
            include: {
              merchant: true,
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
              },
            })

            return {
              id: newUser.id,
              role: newUser.role,
              name: `${newUser.firstName} ${newUser.lastName}`,
              status: newUser.status,
              email: newUser.email ?? undefined,
              walletAddress: newUser.walletAddress,
              merchant: newUser.merchant,
              isNewUser: true,
            }
          }

          return {
            id: user.id,
            walletAddress: user.walletAddress,
            role: user.role,
            name: user.firstName ? `${user.firstName} ${user.lastName}` : user.walletAddress,
            status: user.status,
            email: user.email ?? undefined,
            merchant: user.merchant,
            isNewUser: false,
          }
        } catch (e: any) {
          console.error('Failed Authentication', e.message)
          return null
        }
      }
    }),
  ],

  pages: {
    signIn: "/",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, trigger, user, session }) {
      // console.log("jwt token before", token);
      // console.log("jwt use
      if (user) {
        token = {
          ...token,
          ...user
        }
      }

      if (trigger === 'update' && session?.user) {
        token = {
          ...token,
          ...session?.user,
        }
      }

      // console.log("jwt token after", token);
      return token;
    },


    async session({ session, token }: { session: any, token: any }) {
      session.user = session.user || {};
      session.user.id = token?.id
      session.user.name = token?.name
      session.user.email = token?.email
      session.user.walletAddress = token?.walletAddress;
      session.user.image = "https://www.fillmurray.com/128/128";
      session.user.role = token?.role || "GUEST";  // Default to "GUEST" if role is not defined
      session.user.status = token?.status
      session.user.merchantId = token?.merchant?.id
      session.user.merchant = token?.merchant

      // Initialize address
      session.address = token.walletAddress;
      session.isNewUser = token.isNewUser;

      // console.log("SESSION after", session)
      // console.log("TOKEN after", token)

      return session;
    },
  },
};