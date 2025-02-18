'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterCard from '@/components/register/RegisterCard';


export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      console.log("회원가입 정보 : ", response)

      if (response.ok) {
        router.push("/login") // 회원가입 성공 시 로그인 페이지로
      } else {
        const data = await response.json()
        setError(data.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

    return (
      <div className="min-h-screen flex items-center justify-center container mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <RegisterCard
            username={username}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    )
  }
