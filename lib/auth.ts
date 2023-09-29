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
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          console.log("siwe.address:", siwe.address);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            nonce: credentials?.nonce,
          });
          console.log("siwe.nonce:", siwe.nonce);

          if (!result.success) {
            console.error("SIWE verification failed");
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { walletAddress: siwe.address },
            include: {
              merchant: true,
            },
          });

          if (user) {
            return {
              ...user,
              isNewUser: false,
            };
          }

          const newUser = await prisma.user.create({
            data: {
              walletAddress: siwe.address,
              role: "GUEST",
            },
            include: {
              merchant: true,
            },
          });

          return {
            ...newUser,
            isNewUser: true,
          };
        } catch (e: any) {
          console.error("Failed Authentication", e.message);
          return null;
        }
      },
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
          user,
        };
      }

      if (trigger === "update" && session?.user) {
        token = {
          ...token,
          user: session?.user,
        };
      }

      // console.log("jwt token after", token);
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = token?.user || session.user || {};

      // Initialize address
      session.user.name = [session.user.firstName, session.user.lastName]
        .filter((entry) => !entry)
        .join(" ");
      session.address = session.user.walletAddress;
      session.isNewUser = session.user.isNewUser;

      return session;
    },
  },
};
