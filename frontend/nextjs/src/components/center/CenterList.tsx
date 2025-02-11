'use client';

import { CenterData } from "@/app/types/center";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";





export default function CenterList() {
	// 타입에 담기, 이중딕셔너리니까 리스트형태로 한 겹 빼고 담음.
	const [centerData, setCenterData ] = useState<CenterData[]>([]);

	// API 전체 센터 리스트 불러오기
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/center', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json' 
				},
			});
			const result = await response.json();
	console.log(result);
	setCenterData(result);
	};
	fetchData();
	}, []);

	// 담은 타입으로 센터 카드 간략하게 보여주기



	return (
		<div className="container mx-auto px-4 py-8">
		<h1 className="text-3xl font-bold text-gray-800 mb-8">센터 목록</h1>
		
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{centerData.map((center) => (
			<div
				key={center.id}
				className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
			>
				<div className="p-6 space-y-4">
				{/* 헤더 섹션 */}
				<div className="flex items-start justify-between">
					<h2 className="text-xl font-bold text-gray-900">{center.name}</h2>
					<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
					ID: {center.id}
					</span>
				</div>
	
				{/* 위치 정보 */}
				<div className="flex items-center text-gray-600">
					<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0"
					viewBox="0 0 20 20"
					fill="currentColor"
					>
					<path
						fillRule="evenodd"
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
						clipRule="evenodd"
					/>
					</svg>
					<p className="text-sm break-words">{center.location}</p>
				</div>
	
				{/* 운동 종목 */}
				<div className="space-y-2">
					<h3 className="text-sm font-semibold text-gray-700">운동 종목</h3>
					<div className="flex flex-wrap gap-2">
					{center.exercise.map((item, index) => (
						<span 
						key={index}
						className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
						>
						{item}
						</span>
					))}
					</div>
				</div>
	
				{/* 편의 시설 */}
				<div className="space-y-2">
					<h3 className="text-sm font-semibold text-gray-700">편의 시설</h3>
					<div className="flex flex-wrap gap-2">
					{center.amenity.map((item, index) => (
						<span
						key={index}
						className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
						>
						{item}
						</span>
					))}
					</div>
				</div>
				</div>
			</div>
			))}
		</div>
		</div>
	);
	}