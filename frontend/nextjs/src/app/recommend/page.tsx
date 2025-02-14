'use client';

import Image from "next/image";
export function RecommendInstructor() {
	return (
		<div>
		<section className="mb-8 mt-8">
			<div className="relative flex items-center h-[400px]">
			{/* 왼쪽 여백에 글 */}
			<div className="absolute left-0 top-1/3 w-1/2 px-4">
				<h2 className="text-3xl font-bold mb-4">다양한 강사님들을 만나보세요</h2>
				<p className="text-gray-600">
				전문적이고 활력을 주는 최고의 강사님들을 소개합니다. 당신의 운동 목표를 달성할 수 있도록 도와드립니다.
				</p>
			</div>

			{/* 오른쪽 강사1 */}
			<div className="ml-auto w-1/2 h-full bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
				<Image
				src="/images/ins14.jpg" // 강사1 이미지 경로
				alt="강사1"
				width={200}
				height={300}
				className="w-full h-[300px] object-cover rounded-lg mb-4"
				/>
				<h3 className="text-xl font-bold">강사1</h3>
				<p className="text-gray-600 mt-2 text-center">
				전문적인 트레이닝과 활력을 주는 최고의 강사입니다.
				</p>
			</div>
			</div>

			{/* 나머지 강사들 (강사2, 강사3, 강사4) */}
			<div className="grid grid-cols-3 gap-4 mt-8">
			{/* 강사2 */}
			<div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
				<Image
				src="/images/ins3.png" // 강사2 이미지 경로
				alt="강사2"
				width={200}
				height={200}
				className="w-full h-[200px] object-cover rounded-lg mb-4"
				/>
				<h3 className="text-lg font-bold">강사2</h3>
				<p className="text-gray-600 mt-2 text-center">건강한 운동을 위한 전문가.</p>
			</div>

			{/* 강사3 */}
			<div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
				<Image
				src="/images/ins24.jpg" // 강사3 이미지 경로
				alt="강사3"
				width={200}
				height={200}
				className="w-full h-[200px] object-cover rounded-lg mb-4"
				/>
				<h3 className="text-lg font-bold">강사3</h3>
				<p className="text-gray-600 mt-2 text-center">체계적인 트레이닝 제공.</p>
			</div>

			{/* 강사4 */}
			<div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
				<Image
				src="/images/ins12.jpg" // 강사4 이미지 경로
				alt="강사4"
				width={200}
				height={200}
				className="w-full h-[200px] object-cover rounded-lg mb-4"
				/>
				<h3 className="text-lg font-bold">강사4</h3>
				<p className="text-gray-600 mt-2 text-center">운동의 즐거움을 선물합니다.</p>
			</div>
			</div>
		</section>
		</div>
	);
	}

export function RecommendLesson(){
	return (
		<div>
			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">추천 수업</h2>
				<div className="h-40 bg-gray-100 flex items-center justify-center">
					<p>추천 수업 영역</p>
				</div>
			</section>
		</div>
	);
}


