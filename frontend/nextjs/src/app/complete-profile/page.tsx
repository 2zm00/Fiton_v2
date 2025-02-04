// app/complete-profile/page.tsx
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function CompleteProfile() {
  const router = useRouter()
  const { data: session } = useSession()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    role: '',
    // 기타 필요한 추가 정보
	name: '',
    phone: '',
    address: '',
    // 강사 및 센터장 추가 정보
    experience: '',
    certification: '',
    centerName: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
		setStep(2)
	  } else {
		try {
			const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/info`, {
			method: 'POST',
			headers: { 
				"Content-Type": "application/json",
				"Authorization": `Bearer ${session?.accessToken}`
			},
		body: JSON.stringify(formData),
		credentials: 'include'
    })
    
    if (response.ok) {
		router.push('/');
        } else {
			throw new Error('Failed to save user info')
		}
		} catch (error) {
		console.error('Error saving user info:', error)
		}
	}
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4">
		<h1 className="text-2xl font-bold mb-6">
			{step === 1 ? '역할 선택' : '추가 정보 입력'}
		</h1>
		<form onSubmit={handleSubmit} className="w-full max-w-md">
			{step === 1 ? (
			<div>
				<label htmlFor="role" className="block text-lg font-medium mb-2">
				역할을 선택하세요:
				</label>
				<select
				id="role"
				value={formData.role}
				onChange={(e) => setFormData({ ...formData, role: e.target.value })}
				className="w-full p-3 border border-gray-300 rounded-lg mb-4"
				required
				>
				<option value="">역할을 선택하세요</option>
				<option value="member">회원</option>
				<option value="instructor">강사</option>
				<option value="centerowner">센터장</option>
				</select>
			</div>
			) : (
			<>
				<input
				type="text"
				placeholder="이름"
				value={formData.name}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				className="w-full p-3 border border-gray-300 rounded-lg mb-4"
				required
				/>
				<input
				type="tel"
				placeholder="전화번호"
				value={formData.phone}
				onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
				className="w-full p-3 border border-gray-300 rounded-lg mb-4"
				required
				/>
				<input
				type="text"
				placeholder="주소"
				value={formData.address}
				onChange={(e) => setFormData({ ...formData, address: e.target.value })}
				className="w-full p-3 border border-gray-300 rounded-lg mb-4"
				required
				/>
				{(formData.role === 'instructor' || formData.role === 'centerowner') && (
				<>
					<input
					type="text"
					placeholder="경력"
					value={formData.experience}
					onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
					className="w-full p-3 border border-gray-300 rounded-lg mb-4"
					/>
					<input
					type="text"
					placeholder="자격증"
					value={formData.certification}
					onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
					className="w-full p-3 border border-gray-300 rounded-lg mb-4"
					/>
				</>
				)}
				{formData.role === 'centerowner' && (
				<input
					type="text"
					placeholder="센터 이름"
					value={formData.centerName}
					onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
					className="w-full p-3 border border-gray-300 rounded-lg mb-4"
				/>
				)}
			</>
			)}
			<button
			type="submit"
			className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
			>
			{step === 1 ? '다음' : '저장'}
			</button>
		</form>
		</div>
	);
	}

