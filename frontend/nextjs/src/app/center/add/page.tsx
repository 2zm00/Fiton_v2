'use client';

import { CenterData } from "@/app/types/center";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";



export default function CenterAddPage() {
	const [error, setError] = useState<string |null>(null);
	const router = useRouter()

	const [centerData, setCenterData ] = useState<CenterData>({
		name: '',
		location: '',
		exercise: [],
		amenity: [],
	});

	const payload = {
		name: centerData.name,
        location: centerData.location,
        exercise: centerData.exercise,
        amenity: centerData.amenity,
    };



	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)


	console.log('최종 센터 데이터:', payload);

	const response = await fetch("/api/center/", {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(centerData),
	})
	if (response.ok)
		console.log("RESPONSE:", response);
	}


	const handleChange = (field: keyof CenterData, value: any) => {
		setCenterData(prev => ({
		...prev,
		[field]: value
		}));
	};
	
	return (
		<div className="container mx-auto">
			<form onSubmit={handleSubmit} className="space-y-8">
			<input
				type="text"
				placeholder="센터 이름"
				value={centerData.name}
				onChange={(e) => handleChange( 'name', e.target.value )}
			/>
			
			<input
				type="text"
				placeholder="센터 위치"
				value={centerData.location}
				onChange={(e) => handleChange( 'location', e.target.value )}
			/>

			<input
				type="text"
				placeholder="운동 종목 (쉼표로 구분)"
				value={centerData.exercise}
				onChange={(e) => handleChange( 'exercise', e.target.value.split(',').map((item)=> item.trim()) )}
			/>

			<input
                type="text"
                placeholder="편의 시설 (쉼표로 구분)"
                value={centerData.amenity}
                onChange={(e) => handleChange('amenity',  e.target.value.split(',').map((item) => item.trim()) )}
            />
			{/* <input
			    type="file"
                placeholder="센터 이미지"
                onChange={(e) => handleChange('image',  e.target.value )}
			/> */}
			
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">센터 추가</button>
		</form>
		</div>
	);
}

