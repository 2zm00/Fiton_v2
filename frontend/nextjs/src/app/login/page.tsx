'use client';

import React, { useState } from 'react';
import LoginCard from '@/components/login/LoginCard';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // NextAuth.js의 CredentialsProvider를 통해 로그인 요청
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // 리디렉션 비활성화 (결과를 수동으로 처리)
      });

      if (result?.ok) {
        // 로그인 성공 시 리디렉션
        window.location.href = "/"; // 홈 페이지로 이동
      } else {
        // 로그인 실패 시 에러 메시지 설정
        setError("로그인 실패! 아이디와 비밀번호를 확인하세요.");
      }
    } catch (err) {
      console.error("로그인 요청 중 오류 발생:", err);
      setError("서버와의 통신 중 문제가 발생했습니다.");
    }
  };


  return (
	<div className="min-h-screen flex items-center justify-center">
		<div className="w-full max-w-md  rounded-lg p-8">
		{/* LoginCard 컴포넌트 */}
		<LoginCard
			username={username}
			password={password}
			onUsernameChange={(e) => setUsername(e.target.value)}
			onPasswordChange={(e) => setPassword(e.target.value)}
			onSubmit={handleLogin}
		/>


		</div>
	</div>
  );
}
