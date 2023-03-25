import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_GATEWAY}/api-gateway/account-service/account/sign-in`,
            credentials
          );

          if (response) {
            return response.data;
          }
        } catch (error) {
          const message = error.response.data.message;
          throw new Error(message);
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/accounts/sign-in",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.account.token;
        token.user = user.account;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.email = token.user.email;
      session.user.name = token.user.name;
      session.user.role = token.user.role;
      session.user.avatar = token.user.avatar;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
