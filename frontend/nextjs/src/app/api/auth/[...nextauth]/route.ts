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

          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/${endpoint}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Authentication failed");
          } 
          
          const user = await response.json();
          return user;
          

        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {

      // console.log("JWT Callback - Before:", { token, user });

      if (user) {
        token.access = user.access;   
        token.refresh = user.refresh; 
        token.username = user.username;
        token.role = user.role; 
      }

      // console.log("JWT Callback - After:", { token });
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {

      // console.log("Session Callback - Before:", { session, token });

      session.accessToken = token.access;
      session.user.username = token.username;
      session.user.role = token.role;

      // console.log("Session Callback - After:", { session });
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true // 디버그 모드 활성화
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
