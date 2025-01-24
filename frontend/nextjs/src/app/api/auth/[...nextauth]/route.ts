import NextAuth from "next-auth";

export const authOptions = {

		providers: [
	//         KakaoProvider({
	//             clientId: process.env.KAKAO_CLIENT_ID ?? "",
	//             clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
	//         }),
	//         NaverProvider({
	//             clientId: process.env.KAKAO_CLIENT_ID ?? "",
	//             clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
	//         }),
	//         GoogleProvider({
	//             clientId: process.env.KAKAO_CLIENT_ID ?? "",
	//             clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
	//         }),
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };