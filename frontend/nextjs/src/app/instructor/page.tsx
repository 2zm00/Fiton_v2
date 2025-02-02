'use client';

import React from 'react';
import InstructorProfile from '@/components/instructor/InstructorProfile';

export default function InstructorListPage() {
  // 더미 데이터 (강사 정보)
	const instructors = [
	{
		id: 1,
		image: '/images/instructor1.jpg',
		name: '강사 A',
		description: '전문적인 트레이닝과 활력을 주는 최고의 강사입니다.',
	},
	{
		id: 2,
		image: '/images/instructor2.jpg',
		name: '강사 B',
		description: '체계적인 운동 프로그램을 제공합니다.',
	},
	{
		id: 3,
		image: '/images/instructor3.jpg',
		name: '강사 C',
		description: '건강한 라이프스타일을 선물합니다.',
	},
	{
		id: 4,
		image: '/images/instructor4.jpg',
		name: '강사 D',
		description: '운동의 즐거움을 가르치는 전문가입니다.',
	},
	];

	return (
	<div className="container mx-auto px-4 py-8">
		{/* 헤더 */}
		<header className="mb-8 text-center">
		<h1 className="text-4xl font-bold mb-2">강사 리스트</h1>
		<p className="text-gray-600">최고의 강사를 만나보세요!</p>
		</header>

		{/* 강사 목록 */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{instructors.map((instructor) => (
			<InstructorProfile
			key={instructor.id}
			image={instructor.image}
			name={instructor.name}
			description={instructor.description}
			/>
		))}
		</div>
	</div>
	);
}
