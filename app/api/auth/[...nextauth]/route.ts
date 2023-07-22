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
      // id: "web3", // <- I'm not sure if this is needed?
      name: "Sign In With Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signed Message", type: "text" }, // aka signature
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          console.log("siwe.address:", siwe.address);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            nonce: await getCsrfToken({ req }),
          })

          if (!result.success) {
            console.error("SIWE verification failed")
            return null
          }

          const user = await prisma.user.findUnique({
            where: { walletAddress: siwe.address },
            include: {
              merchant: true,
              operator: true,
            },
          })
          console.log("user.walletAddress:", user?.walletAddress);

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
            console.log("newUser.walletAddress:", newUser?.walletAddress);

            return {
              sub: newUser.walletAddress,
              id: newUser.id,
              role: newUser.role,
              merchant: newUser.merchant ? { id: newUser.merchant.id } : null,
              operator: newUser.operator ? { id: newUser.operator.id } : null,
            }
          }

          return {
            sub: user.walletAddress,
            id: user.id,
            role: user.role,
            merchant: user.merchant ? { id: user.merchant.id } : null,
            operator: user.operator ? { id: user.operator.id } : null,
          }
        } catch (e) {
          console.error(e)
          return null
        }
      }

    }),
  ],

  pages: {
    signIn: "/",
  },

  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async jwt({ token, user, trigger }) {
      console.log("jwt token", token);
      console.log("jwt user", user);

      if ((trigger === 'signIn' || trigger === 'signUp') && user) {
        const { walletAddress } = user as any; // type casting `user` to `any`
        return {
          ...token,
          sub: walletAddress,
        };
      } else {
        return token;
      }
    },

    async session({ session, token }: { session: any, token: any }) {
      console.log("SESSION", session)
      console.log("TOKEN", token)

      if (token.sub === undefined) {
        throw new Error("token.sub is undefined");
      }

      session.user = session.user || {};
      session.user.name = token.sub;
      session.user.image = "https://www.fillmurray.com/128/128";

      // Initialize address
      session.address = token.sub;


      return session;
    },

  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
