import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const authOptions = {
  providers: [
    // Kakao 소셜 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
    }),
    // Naver 소셜 로그인
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
    // 이메일/비밀번호 기반 인증 (회원가입 및 로그인 처리)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        isRegistering: { label: "isRegistering", type: "hidden" }, // 회원가입 여부 추가
      },
      async authorize(credentials) {
        const isRegistering = credentials?.isRegistering === "true"; // 회원가입 여부 확인

        if (isRegistering) {
          // 회원가입 로직
          console.log("회원가입 요청:", credentials);
          const registerResponse = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (!registerResponse.ok) {
            const errorData = await registerResponse.json();
            console.error("회원가입 실패:", errorData);
            throw new Error(errorData.error || "회원가입에 실패했습니다.");
          }

          const user = await registerResponse.json();
          console.log("회원가입 성공:", user);
          return user; // 회원가입 성공 시 사용자 정보 반환
        } else {
          // 로그인 로직
          console.log("로그인 요청:", credentials);
          const loginResponse = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            console.error("로그인 실패:", errorData);
            throw new Error(errorData.error || "로그인에 실패했습니다.");
          }

          const user = await loginResponse.json();
          console.log("로그인 성공:", user);
          return user; // 로그인 성공 시 사용자 정보 반환
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username; // 사용자 이름 추가
        token.accessToken = user.token; // Django에서 반환한 JWT 토큰 저장
      }
      return token;
    },
    async session({ session, token }) {
      session.username = token.username; // 세션에 사용자 정보 저장
      session.accessToken = token.accessToken; // 세션에 JWT 토큰 저장
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // NextAuth 비밀키
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
