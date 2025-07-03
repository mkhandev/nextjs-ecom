import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { PrismaClient } from "@prisma/client";
//import { compare } from "bcrypt-ts-edge";
//import { prisma } from "./db/prisma";
export const prisma = new PrismaClient();

export const config: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: "/signout",
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
    /*
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true, // ✅ this is the actual hashed password
          },
        });

        if (!user || !user.password) {
          console.log("User or password not found");
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        console.log(user);

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
    */
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

//export const { handlers, auth, signIn, signOut } = NextAuth(config);
