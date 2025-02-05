'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import UserRole from '@/components/user/UserRole';
import { RoleCheckModal } from '@/components/common/RoleCheckModal';

export default function DashboardPage() {
const { data: session, status } = useSession();
const router = useRouter();
const [showModal, setShowModal] = useState(false);

useEffect(() => {
	// session이 로딩중이면 아무것도 하지 않고 기다림
	if (status === 'loading') return;

	// 로그인하지 않은 경우 /login으로 리다이렉트
	if (!session) {
	router.push('/login');
	return;
	}

	// 로그인 상태라면, /api/user/info에 GET 요청을 보내 role_data 확인
	const fetchUserInfo = async () => {
	try {
		const response = await fetch('/api/user/info');
		if (!response.ok) throw new Error('사용자 정보를 가져오지 못했습니다.');
		const result = await response.json();

		// role_data가 존재하면 /user/info 로 이동
		if (result?.role_data) {
		router.push('/user/info');
		} else {
		// role_data가 없으면 RoleCheckModal을 표시
		setShowModal(true);
		}
	} catch (error) {
		console.error(error);
		// 필요시 추가적인 에러 처리가 가능합니다.
	}
	};

	fetchUserInfo();
}, [session, status, router]);

return (
	<div className="container mx-auto">
	<UserRole />
	<RoleCheckModal
		isOpen={showModal}
		onClose={() => setShowModal(false)}
	/>
	</div>
);
}
