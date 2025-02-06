'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Role, UserData } from '@/app/types/user';
import { useSession } from 'next-auth/react';

export default function RoleInfoPage() {
const params = useParams();
const role = params.role as Role;
const router = useRouter();
const { data: session } = useSession();
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const [userData, setUserData] = useState({
	username: '',
	name: '',
	profile_image: '',
	role: role,
	gender: 'None',
	birth: '',
	phone_number: '',
	specialties: [],
	certifications: [],
    years_of_experience: 0,
    bio: '',
	business_registration_number: '',
	rating: 0
});

const payload = {
	role: role,
	username: userData.username,
	profile_image: userData.profile_image,
	name: userData.name,
	gender: userData.gender,
	birth: userData.birth,
	phone_number: userData.phone_number,
	// userData.specialties가 배열인 경우 문자열로 변환 (콤마로 구분)
	specialties: userData.specialties.join(", "),
	years_of_experience: userData.years_of_experience,
	// userData.certifications가 배열인 경우 문자열로 변환
	certifications: userData.certifications.join(", "),
	bio: userData.bio,
	business_registration_number: userData.business_registration_number,
};

useEffect(() => {
	if (session && session.user) {
		setUserData(prev => ({
		...prev,
		username: (session.user as any).username || prev.username,
		name: (session.user as any).name || prev.name,
		}));
	}
	}, [session]);

const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsLoading(true);
	setError(null);




	const response = await fetch('/api/user/info/', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
	});





    // 성공 여부를 응답 구조에 맞게 수정
    if (response.ok) 
      router.push('/user/info');



	router.push('/user/info');
	
};

const handleUserDataChange = (field: keyof UserData, value: any) => {
	setUserData(prev => ({
	...prev,
	[field]: value
	}));
};

const handleInstructorDataChange = (field: keyof UserData, value: string) => {
	if (role === 'instructor') {
	setUserData(prev => ({
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
				value={userData.specialties.join(', ')}
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
				value={userData.certifications.join(', ')}
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
				value={userData.years_of_experience}
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
				value={userData.bio}
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
			value={userData.bio}
			onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
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
			value={userData.business_registration_number}
			onChange={(e) => setUserData({ ...userData, business_registration_number: e.target.value })}
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
			프로필 이미지
			</label>
			<input
			type="file"
			accept="image/*"
			onChange={(e) => {
				const file = e.target.files?.[0];
				if (file) {
				// 실제 구현에서는 이미지 업로드 처리
				setUserData({
					...userData,
					profile_image: URL.createObjectURL(file)
				});
				}
			}}
			className="mt-1 block w-full"
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
