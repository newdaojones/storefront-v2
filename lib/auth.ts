import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { Credentials } from "types/auth";
import prisma from "@/lib/prisma";

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
          console.log("user.walletAddress:", user?.walletAddress);

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                walletAddress: siwe.address,
                role: "GUEST",
              },
            })

            return {
              id: newUser.id,
              walletAddress: newUser.walletAddress,
              role: newUser.role,
              isNewUser: true,
            }
          }

          return {
            id: user.id,
            walletAddress: user.walletAddress,
            role: user.role,
            isNewUser: false,
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
    async jwt({ token, user }) {
      console.log("jwt token before", token);
      console.log("jwt user", user);

      if (user) {
        const { walletAddress, isNewUser, role } = user as any;

        try {
          if (walletAddress) {
            token.walletAddress = walletAddress;
            console.log(`Assigned user.walletAddress to token.walletAddress: ${token.walletAddress}`);
          } else {
            console.error('user.walletAddress is undefined');
          }

          if (role) {
            token.role = role;
            console.log(`Assigned user.role to token.role: ${token.role}`);
          } else {
            console.error('user.role is undefined');
          }
        } catch (error) {
          console.error('Failed to set token.walletAddress or token.role:', error);
        }

        if (isNewUser !== undefined) {
          token.isNewUser = isNewUser;
          console.log(`Assigned user.isNewUser to token.isNewUser: ${token.isNewUser}`);
        } else {
          console.error('user.isNewUser is undefined');
        }
      }

      console.log("jwt token after", token);
      return token;
    },


    async session({ session, token }: { session: any, token: any }) {
      // if (token.walletAddress === undefined) {
      //   throw new Error("token.walletAddress is undefined");
      // }

      session.user = session.user || {};
      session.user.name = token?.walletAddress;
      session.user.image = "https://www.fillmurray.com/128/128";
      session.user.role = token.role || "GUEST";  // Default to "GUEST" if role is not defined

      // Initialize address
      session.address = token.walletAddress;
      session.isNewUser = token.isNewUser;

      console.log("SESSION after", session)
      console.log("TOKEN after", token)

      return session;
    },
  },
};