// components/RoleSelection.tsx
import React from 'react';
import { Role } from '@/app/types/user';

interface RoleSelectionProps {
	onSelect: (role: Role) => Promise<void>;
	isLoading: boolean;
	}

	const ROLE_INFO = {
	instructor: { label: '강사', color: 'blue' },
	centerowner: { label: '센터장', color: 'green' },
	member: { label: '회원', color: 'purple' }
	} as const;

	export function RoleSelection({ onSelect, isLoading }: RoleSelectionProps) {
	return (
	<div className="max-w-md mx-auto p-6">
		<h2 className="text-2xl font-bold mb-6 text-center">역할을 선택해주세요</h2>
		<div className="space-y-4">
		{(Object.entries(ROLE_INFO) as [Role, typeof ROLE_INFO[keyof typeof ROLE_INFO]][]).map(([role, info]) => (
			<button
			key={role}
			onClick={() => onSelect(role)}
			disabled={isLoading}
			className={`
				w-full p-4 rounded-lg font-medium text-white
				transition-all duration-200
				${isLoading ? 'bg-gray-400 cursor-not-allowed' : `bg-${info.color}-500 hover:bg-${info.color}-600`}
			`}
			>
			{isLoading ? '처리중...' : info.label}
			</button>
		))}
		</div>
	</div>
	);
}
