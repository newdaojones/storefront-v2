
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
      id: "web3-fuck",
      name: "web3- balls",
      credentials: {
        message: { label: "Message", type: "text" },
        signedMessage: { label: "Signed Message", type: "text" }, // aka signature
      },
      async authorize(credentials, req) {
        if (!credentials?.signedMessage || !credentials?.message) {
          return null;
        }
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message));
          const result = await siwe.verify({
            signature: credentials.signedMessage,
            nonce: await getCsrfToken({ req }),
          });

          if (!result.success) throw new Error("Invalid Signature");

          if (result.data.statement !== process.env.NEXT_PUBLIC_SIGNIN_MESSAGE)
            throw new Error("Statement Mismatch");

          console.log("Returning")
          return {
            id: siwe.address,
          };
        } catch (error) {
          console.log(error);
          return null;
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
    async session({ session, token }: { session: any; token: any }) {
      session.user.address = token.sub;
      session.user.token = token;
      return session;
    },
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
