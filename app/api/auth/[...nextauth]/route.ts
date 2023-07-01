
// [...nextauth]/route.ts
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        publicKey: { label: "PublicKey", type: "publicKey" }
      },
      async authorize(credentials) {
        const { email, publicKey } = credentials as { email: string, publicKey: string };

        if (!email || !publicKey) {
          throw new Error("Missing username or publicKey");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !(await compare(publicKey, user.publicKey))) {
          throw new Error("Invalid username or publicKey");
        }
        return { ...user, id: user.id.toString(), role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      if (typeof token.userId === 'string') {
        session.userId = token.userId;
      }
      if (typeof token.role === 'string') {
        session.role = token.role;
      }

      console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
