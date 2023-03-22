import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { env } from "~/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
/**
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user.image = null; // there was some stupid error with the image not existing
        session.user.email = null;
      }

      return session;
    }
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
          const user: object = { "id": "hello", "name": "Rohak", "password": "Rohak123" };
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
