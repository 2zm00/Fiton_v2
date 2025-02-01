'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import RegisterCard from '@/components/register/RegisterCard';


export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      username,
      password,
      isRegistering: "true", // 회원가입 플래그
      redirect: false
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/login'); // 회원가입 성공 시 로그인 페이지로
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center container mx-auto">
      <form onSubmit={handleSubmit}>
        <RegisterCard
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
