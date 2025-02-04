'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import LoginCard from '@/components/login/LoginCard';
import Popup from '@/components/common/Popup';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
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

    try {
      const roleResponse = await fetch('http://localhost:8000/api/user/role/', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        credentials: 'include',
      });

      if (!roleResponse.ok) {
        throw new Error('역할 정보 조회에 실패했습니다');
      }

      const { role } = await roleResponse.json();

      if (!role) {
        setShowPopup(true);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error("역할 정보 조회 실패:", error);
      setError("역할 정보를 가져오는데 실패했습니다.");
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup(false);
    router.push('/complete-profile');
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
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

        {showPopup && (
          <Popup 
            message="추가적인 정보를 제공해주세요!!"
            onConfirm={handlePopupConfirm} 
            onCancel={handlePopupCancel} 
          />
        )}
      </div>
    </div>
  );
}
