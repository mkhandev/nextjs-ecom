import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            name: true,
            email: true,
            password: true, // ✅ this is the actual hashed password
            role: true,
          },
        });

        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        // If user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      console.log(session);

      return session;
    },
    async jwt({ token }) {
      //If user has no name then use the email
      if (token.name === "NO_NAME") {
        token.name = token.email!.split("@")[0];

        // Update database to reflect the token name
        await prisma.user.update({
          where: { id: token.sub },
          data: { name: token.name },
        });
      }

      return token;
    },
  },
});
