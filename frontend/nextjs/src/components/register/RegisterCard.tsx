import React from 'react';

interface RegisterCardProps {
  username: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RegisterCard({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
}: RegisterCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      {/* 제목 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p className="text-gray-600">새 계정을 생성하세요</p>
      </div>

      {/* 입력 필드 */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          아이디
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
          placeholder="아이디를 입력하세요"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호를 입력하세요"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        회원가입
      </button>
    </div>
  );
}
