import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "./models/user.model";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.MONGO_URI,
  pages: {},
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async createUser(message) {
      const { email, username } = message.account;
      await User.create({
        username,
        personalEmail: email,
      });
    },
  },
});
