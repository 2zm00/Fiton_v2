'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role } from '@/app/types/user';

export default function AddUserRolePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = async (role: Role) => {
    if (!role) {
      setError("유효한 역할이 선택되지 않았습니다.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("역할 등록 data :", data)
        if (data.error) {
          throw new Error(data.error);
        }
      }
      // 역할 설정 성공 후 role이 유효하다고 확인되면 이동
      router.push(`/user/info/add/${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {error && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="max-w-md mx-auto space-y-4 p-6">
        <h1 className="text-2xl font-bold text-center mb-8">역할을 선택해주세요</h1>

        <button
          onClick={() => handleRoleSelect('instructor')}
          disabled={isLoading}
          className={`w-full p-4 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          강사
        </button>

        <button
          onClick={() => handleRoleSelect('centerowner')}
          disabled={isLoading}
          className={`w-full p-4 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          센터장
        </button>

        <button
          onClick={() => handleRoleSelect('member')}
          disabled={isLoading}
          className={`w-full p-4 rounded-lg font-medium text-white bg-purple-500 hover:bg-purple-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          회원
        </button>
      </div>
    </div>
  );
}
