'use client';

import React from 'react';


interface InstructorProfileProps {
  image: string; // 강사 이미지 경로
  name: string; // 강사 이름
  description: string; // 강사 소개
}

export default function InstructorProfile({
	image,
	name,
	description,
	}: InstructorProfileProps) {
	return (
	<div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
		{/* 강사 이미지 */}
		<img
		src={image}
		alt={name}
		width={500}
		height={200}
		className="w-full h-[200px] object-cover"
		/>
		{/* 강사 정보 */}
		<div className="p-4">
		<h3 className="text-xl font-bold mb-2">{name}</h3>
		<p className="text-gray-600">{description}</p>
		</div>
	</div>
	);
}
