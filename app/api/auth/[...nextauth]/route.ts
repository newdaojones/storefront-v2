import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        passkey: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, passkey } = credentials as { email: string, passkey: string };
        if (!email || !passkey) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(passkey, user.passkey))) {
          throw new Error("Invalid username or password");
        }
        return { ...user, id: user.id.toString() };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
