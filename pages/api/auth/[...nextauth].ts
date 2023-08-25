import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
