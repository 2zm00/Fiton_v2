'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Role, UserData, RoleData, UserInfoResponse, ApiResponse, InstructorRoleData } from '@/app/types/user';

export default function RoleInfoPage() {
const params = useParams();
const role = params.role as Role;
const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const [userData, setUserData] = useState<UserData>({
	id: 0,
	username: '',
	name: '',
	profile_image: null,
	role: role,
	gender: 'None',
	birth: '',
	phone_number: ''
});

const [roleData, setRoleData] = useState<RoleData>(() => {
	switch (role) {
	case 'instructor':
		return {
		specialties: [],
		certifications: [],
		years_of_experience: 0,
		bio: '',
		rating: 0
		};
	case 'member':
		return {
		bio: ''
		};
	case 'centerowner':
		return {
		business_registration_number: ''
		};
	default:
		throw new Error('Invalid role');
	}
});

const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsLoading(true);
	setError(null);

	try {
	const requestData: UserInfoResponse = {
		user_data: userData,
		role_data: roleData,
		role: role
	};

	const response = await fetch('/api/user/info', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData)
	});

	const result: ApiResponse<UserInfoResponse> = await response.json();

	if (!result.success || result.error) {
		throw new Error(result.error || '정보 저장에 실패했습니다.');
	}

	router.push('/user/info');
	} catch (err) {
	setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
	} finally {
	setIsLoading(false);
	}
};

const handleUserDataChange = (field: keyof UserData, value: any) => {
	setUserData(prev => ({
	...prev,
	[field]: value
	}));
};

const handleInstructorDataChange = (field: keyof InstructorRoleData, value: string) => {
	if (role === 'instructor') {
	setRoleData(prev => ({
		...prev,
		[field]: field === 'specialties' || field === 'certifications'
		? value.split(',').map(item => item.trim())
		: field === 'years_of_experience'
			? parseInt(value) || 0
			: value
	}));
	}
};

const renderRoleSpecificFields = () => {
	switch (role) {
	case 'instructor':
		return (
		<div className="space-y-4">
			<div>
			<label className="block text-sm font-medium text-gray-700">
				전문 분야
			</label>
			<input
				type="text"
				placeholder="쉼표로 구분하여 입력"
				value={(roleData as InstructorRoleData).specialties.join(', ')}
				onChange={(e) => handleInstructorDataChange('specialties', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
			</div>
			<div>
			<label className="block text-sm font-medium text-gray-700">
				자격증
			</label>
			<input
				type="text"
				placeholder="쉼표로 구분하여 입력"
				value={(roleData as InstructorRoleData).certifications.join(', ')}
				onChange={(e) => handleInstructorDataChange('certifications', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
			</div>
			<div>
			<label className="block text-sm font-medium text-gray-700">
				경력 (년)
			</label>
			<input
				type="number"
				value={(roleData as InstructorRoleData).years_of_experience}
				onChange={(e) => handleInstructorDataChange('years_of_experience', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				min="0"
			/>
			</div>
			<div>
			<label className="block text-sm font-medium text-gray-700">
				소개
			</label>
			<textarea
				value={(roleData as InstructorRoleData).bio}
				onChange={(e) => handleInstructorDataChange('bio', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				rows={4}
			/>
			</div>
		</div>
		);

	case 'member':
		return (
		<div>
			<label className="block text-sm font-medium text-gray-700">
			소개
			</label>
			<textarea
			value={(roleData as { bio: string }).bio}
			onChange={(e) => setRoleData({ ...roleData, bio: e.target.value })}
			className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			rows={4}
			/>
		</div>
		);

	case 'centerowner':
		return (
		<div>
			<label className="block text-sm font-medium text-gray-700">
			사업자 등록번호
			</label>
			<input
			type="text"
			value={(roleData as { business_registration_number: string }).business_registration_number}
			onChange={(e) => setRoleData({ ...roleData, business_registration_number: e.target.value })}
			className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
			/>
		</div>
		);

	default:
		return null;
	}
};

return (
	<div className="min-h-screen bg-gray-50 py-12">
	<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
		<h1 className="text-2xl font-bold mb-8">프로필 정보 입력</h1>
		
		{error && (
		<div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
			{error}
		</div>
		)}

		<form onSubmit={handleSubmit} className="space-y-8">
		<div className="space-y-4">
			<div>
			<label className="block text-sm font-medium text-gray-700">
				이름
			</label>
			<input
				type="text"
				value={userData.name}
				onChange={(e) => handleUserDataChange('name', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
			</div>

			<div>
			<label className="block text-sm font-medium text-gray-700">
				성별
			</label>
			<select
				value={userData.gender}
				onChange={(e) => handleUserDataChange('gender', e.target.value as 'Male' | 'Female' | 'None')}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			>
				<option value="Male">남성</option>
				<option value="Female">여성</option>
				<option value="None">선택안함</option>
			</select>
			</div>

			<div>
			<label className="block text-sm font-medium text-gray-700">
				생년월일
			</label>
			<input
				type="date"
				value={userData.birth}
				onChange={(e) => handleUserDataChange('birth', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
			</div>

			<div>
			<label className="block text-sm font-medium text-gray-700">
				전화번호
			</label>
			<input
				type="tel"
				value={userData.phone_number}
				onChange={(e) => handleUserDataChange('phone_number', e.target.value)}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				required
			/>
			</div>
		</div>

		<div className="border-t pt-8">
			<h2 className="text-lg font-semibold mb-4">추가 정보</h2>
			{renderRoleSpecificFields()}
		</div>

		<div className="flex justify-end space-x-4">
			<button
			type="button"
			onClick={() => router.back()}
			className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
			disabled={isLoading}
			>
			이전
			</button>
			<button
			type="submit"
			disabled={isLoading}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
			>
			{isLoading ? '저장 중...' : '저장하기'}
			</button>
		</div>
		</form>
	</div>
	</div>
);
}
