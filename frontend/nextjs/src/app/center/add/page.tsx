'use client';

import { CenterData } from "@/app/types/center";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function CenterAddPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [centerData, setCenterData ] = useState<CenterData>({
		name: '',
		location: '',
		exercise: [],
		amenity: []
	});

	const payload = {
		name: centerData.name,
        location: centerData.location,
        exercise: centerData.exercise,
        amenity: centerData.amenity
    };

	const handleSubmit = async (e: React.FormEvent) => {


	console.log('최종 센터 데이터:', payload);

	const response = await fetch('/api/center', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
        throw new Error('센터 추가 실패했습니다.');
    }

	const data = await response.json();
	if (data.error) {
        throw new Error(data.error);
    }

	}

	return (
		<div className="container mx-auto">
			<form onSubmit={handleSubmit} className="space-y-8">
			<input
				type="text"
				placeholder="센터 이름"
				value={centerData.name}
				onChange={(e) => setCenterData({ ...centerData, name: e.target.value })}
			/>
			
			<input
				type="text"
				placeholder="센터 위치"
				value={centerData.location}
				onChange={(e) => setCenterData({ ...centerData, location: e.target.value })}
			/>

			<input
				type="text"
				placeholder="운동 종목 (쉼표로 구분)"
				value={centerData.exercise}
				onChange={(e) => setCenterData({ ...centerData, exercise: e.target.value.split(',').map((item)=> item.trim()) })}
			/>

			<input
                type="text"
                placeholder="편의 시설 (쉼표로 구분)"
                value={centerData.amenity}
                onChange={(e) => setCenterData({...centerData, amenity: e.target.value.split(',').map((item) => item.trim()) })}
            />
			
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">센터 추가</button>
		</form>
		</div>
	);
}

