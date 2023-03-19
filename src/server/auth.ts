import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { env } from "~/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "Username..." },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {

        type Payload = {
          username: string | undefined,
          password: string | undefined
        };
        
        const payload: Payload = {
          username: credentials?.username,
          password: credentials?.password
        };

        if (payload.username === "Rohak" && payload.password === "Rohak123") {
          const user: object = { "id": "hello", "username": "Rohak", "password": "Rohak123" };
          return user;
        }

        return null;
      }
    })
  ],
  secret: env.NEXTAUTH_JWT_SECRET,
};

export const getBranchOutServerSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
