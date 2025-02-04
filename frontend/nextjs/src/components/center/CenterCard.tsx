
'use client';

import Image from "next/image";

export default function CenterCard() {
	return (
			<div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
				>
			{/* 이미지 */}
			<Image
				src={`/images/`}
				alt={`센터`}
				width={500}
				height={200}
				className="w-full h-[200px] object-cover"
			/>
			{/* 내용 */}
			<div className="p-4">
				<h3 className="text-xl font-bold mb-2">센터 </h3>
				<p className="text-gray-600 mb-4">
				서울특별시 강남구 테헤란로 길
				</p>
				{/* 버튼 */}
				<button className="px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-600">
				자세히 보기
				</button>
			
		</div>
		</div>
			
	);
}
