'use client';

import React, { useState } from 'react';
import RegisterCard from '@/components/register/RegisterCard';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 회원가입 요청 (NextAuth의 CredentialsProvider를 통해 처리)
      const registerResult = await signIn("credentials", {
        username,
        password,
        isRegistering: true, // 회원가입 플래그 전달
        redirect: false,
      });

      if (!registerResult?.ok) {
        setError("회원가입에 실패했습니다.");
        return;
      }

      console.log("회원가입 성공");

      setSuccess(true);
      setError('');

      alert("회원가입 및 자동 로그인 성공! 홈으로 이동합니다.");
      router.push('/');
    } catch (err) {
      console.error('회원가입 요청 중 오류 발생:', err);
      setError('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center container mx-auto">
      <form onSubmit={handleRegister}>
        <RegisterCard
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">회원가입 성공! 로그인 페이지로 이동합니다.</p>}
      </form>
    </div>
  );
}
