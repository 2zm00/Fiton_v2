// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    username?: string;
    role? : string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access?: string;
    username?: string;
  }
}
