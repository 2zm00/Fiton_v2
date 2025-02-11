'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginCard from '@/components/login/LoginCard';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log("로그인 정보: ",response)


      if (response.ok) {
        router.push("/")
      } else {
        const data = await response.json();
        setError(data.error || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }



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
