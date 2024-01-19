import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";

const config = {
  //   adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }: any) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          id: "1",
          name: "Administrator",
          email: "admin@example.com",
          password: "password",
        };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        // const response = await fetch(request);
        // if (!response.ok) return null;
        // return (await response.json()) ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/a/signin",
  },
  //   session: { strategy: "jwt" },
} as NextAuthConfig;
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(config);
