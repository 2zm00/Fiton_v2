'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import LoginCard from '@/components/login/LoginCard';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false
    });

    if (result?.error) {
      setError("로그인 실패! 정보를 확인해주세요.");
      return;
    }

    // 로그인 성공 후 세션 갱신을 기다림
    router.refresh();
    router.push('/');
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8">
        <LoginCard
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
        />

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
