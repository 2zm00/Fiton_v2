'use client';

import React from 'react';
import Image from 'next/image';

interface ImageCardProps {
  image: string; // 이미지 경로
  title: string; // 카드 제목
  description: string; // 카드 설명
  buttonText?: string; // 버튼 텍스트 (선택 사항)
  onButtonClick?: () => void; // 버튼 클릭 이벤트 핸들러 (선택 사항)
}

export default function ImageCard({
	image,
	title,
	description,
	buttonText,
	onButtonClick,
}: ImageCardProps) {
	return (
	<div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
		{/* 이미지 */}
		<Image
		src={image}
		alt={title}
		width={300}
		height={200}
		className="w-full h-[200px] object-cover"
		/>
		{/* 내용 */}
		<div className="p-4">
		<h3 className="text-xl font-bold mb-2">{title}</h3>
		<p className="text-gray-600 mb-4">{description}</p>
		{/* 버튼 (선택 사항) */}
		{buttonText && onButtonClick && (
			<button
			onClick={onButtonClick}
			className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
			>
			{buttonText}
			</button>
		)}
		</div>
	</div>
	);
}
