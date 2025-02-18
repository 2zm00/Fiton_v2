'use client';

import React from 'react';
import LessonCard from '@/components/lesson/LessonCard';
import { MINIO_URL } from '@/lib/config';

export default function Lesson() {
  // 더미 데이터 (수업 정보)
	const lessons = [
	{
		id: 1,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins24.jpg`,
		title: '요가 클래스',
		description: '몸과 마음의 균형을 찾는 요가 클래스입니다.',
		buttonText :'요가 체험하기'
	},
	{
		id: 2,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins3.jpg`,
		title: '필라테스 클래스',
		description: '근력을 강화하고 유연성을 높이는 필라테스.',
		buttonText :'유연성 높이기'
	},
	{
		id: 3,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins18.jpg`,
		title: '줌바 댄스',
		description: '즐겁게 춤추며 칼로리를 태우는 줌바 댄스.',
		buttonText :'춤추기'
	},
	{
		id: 4,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins15.jpg`,
		title: '크로스핏 훈련',
		description: '체력을 극대화하는 고강도 크로스핏 훈련.',
		buttonText :'고강도 운동하러가기'
	},
	{
		id: 5,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins6.jpg`,
		title: '명상 클래스',
		description: '마음을 편안하게 하는 명상 클래스.',
		buttonText :''
	},
	{
		id: 6,
		image: `${MINIO_URL}/nextjs/instructor/profile/ins20.jpg`,
		title: '헬스 트레이닝',
		description: '개인 맞춤형 헬스 트레이닝 프로그램.',
		buttonText :''
	},
	];

	return (
	<div className="container mx-auto px-4 py-8">
		{/* 헤더 */}
		<header className="mb-8 text-center">
		<h1 className="text-4xl font-bold mb-2">수업 리스트</h1>
		<p className="text-gray-600">다양한 운동 클래스를 만나보세요!</p>
		</header>

		{/* 수업 목록 */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{lessons.map((lesson) => (
			<LessonCard
			key={lesson.id}
			image={lesson.image}
			title={lesson.title}
			description={lesson.description}
			buttonText={lesson.buttonText}
			/>
		))}
		</div>
	</div>
	);
}
