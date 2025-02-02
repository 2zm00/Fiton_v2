'use client';

import React from 'react';

interface LessonCardProps {
  image: string; // 수업 이미지 경로
  title: string; // 수업 제목
  description: string; // 수업 설명
}

export default function LessonCard({
	image,
	title,
	description,
	}: LessonCardProps) {
	return (
	<div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
		{/* 수업 이미지 */}
		<img
		src={image}
		alt={title}
		className="w-full h-[200px] object-cover"
		/>
		{/* 수업 정보 */}
		<div className="p-4">
		<h3 className="text-xl font-bold mb-2">{title}</h3>
		<p className="text-gray-600 mb-4">{description}</p>
		{/* 버튼 */}
		<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
			자세히 보기
		</button>
		</div>
	</div>
	);
}
