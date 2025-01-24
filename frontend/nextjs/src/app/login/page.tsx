'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginCard from '@/components/login/LoginCard';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
	e.preventDefault(); // 폼 기본 동작 방지

	try {
		const response = await fetch('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
		// 서버에서 에러 반환 시 처리
		const errorData = await response.json();
		setError(errorData.message || '로그인에 실패했습니다.');
		return;
		}

		const data = await response.json();
		console.log('로그인 성공:', data);

		// 토큰 저장 (예: localStorage)
		localStorage.setItem('token', data.token);

		// 메인 페이지로 이동
		router.push('/');
	} catch (err) {
		console.error('로그인 요청 중 오류 발생:', err);
		setError('서버와의 통신 중 문제가 발생했습니다.');
	}
	};
	return (
	<div className="min-h-screen flex items-center justify-center bg-gray-100">
		{/* 로그인 카드 */}
		<LoginCard />
	</div>
	);
}
