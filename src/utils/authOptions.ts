import { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { strapi } from "@/utils/strapi";
import type { AxiosResponse } from "axios";
import type { StrapiUserAuth } from "./types";

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
  },
};
