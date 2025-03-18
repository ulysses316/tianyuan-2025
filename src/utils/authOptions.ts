import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { strapi } from "@/utils/strapi";
import type { AxiosResponse } from "axios";
import type { StrapiUserAuth } from "./types";

declare module "next-auth" {
  interface User {
    name?: string;
    username?: string;
    email?: string;
    documentId?: string;
  }

  interface Session {
    name?: string | undefined;
    username?: string | undefined;
    email?: string | undefined;
    documentId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    username?: string;
    email?: string;
    documentId?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        username: {},
      },
      async authorize(credentials) {
        try {
          const response: AxiosResponse<StrapiUserAuth> = await strapi.post("/api/auth/local", {
            identifier: credentials?.email,
            password: credentials?.password,
          });

          if (response.data.user.blocked === true) return null;

          const user: User = {
            id: response.data.user.documentId,
            name: response.data.user.username,
            email: response.data.user.email,
            documentId: response.data.user.documentId,
            image: "",
          };
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.documentId = user.documentId;
      }
      return token;
    },
    async session({ session, token }) {
      session.name = token.name;
      session.email = token.email;
      session.documentId = token.documentId;

      return session;
    },
  },
};
