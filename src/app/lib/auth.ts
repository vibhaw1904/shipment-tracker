import { prisma } from "./db";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (!user) {
          throw new Error("Authentication failed");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Email or password is incorrect");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    CredentialsProvider({
      name: "signup",
      id: "signup",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password || !credentials?.name) {
          throw new Error("Name, email, and password are required");
        }

        const { email, password, name } = credentials;

        const userExist = await prisma.user.findUnique({
          where: { email },
          select: { id: true },
        });

        if (userExist) {
          throw new Error("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;
