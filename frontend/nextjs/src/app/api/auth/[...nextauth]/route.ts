// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        isRegistering: { type: "hidden" } // 회원가입 플래그
      },
      async authorize(credentials) {
        try {
          // 회원가입/로그인 엔드포인트 동적 선택
          const endpoint = credentials?.isRegistering === "true" 
            ? "register" 
            : "login";

          const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            })
          });

          if (!response.ok) throw new Error("Authentication failed");
          
          return await response.json();

        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.access = user.access;   // Django에서 받은 access 토큰
        token.refresh = user.refresh; // Django에서 받은 refresh 토큰
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.access;
      session.username = token.username;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true // 디버그 모드 활성화
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
