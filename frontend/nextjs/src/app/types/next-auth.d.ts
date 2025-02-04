// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    username?: string;
    user: {
      username?: string;
    }
  }
}
