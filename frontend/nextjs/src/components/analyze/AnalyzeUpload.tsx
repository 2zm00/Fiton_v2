'use client';

import { useState } from 'react';

export default function AnalyzeUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const FAST_API_URL = process.env.NEXT_PUBLIC_FAST_API_URL;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
		setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) {
		setError('파일을 선택해주세요');
		return;
		}

		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', file);

		try {
		const response = await fetch(`${FAST_API_URL}/api/analyze`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('업로드 실패');
		}

		const data = await response.json();
		setVideoUrl(data.video_url);
		setError(null);
		} catch (err) {
		setError(err instanceof Error ? err.message : '알 수 없는 오류');
		setVideoUrl(null);
		} finally {
		setIsLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
			<input
				type="file"
				onChange={handleFileChange}
				accept="video/*"
				className="w-full"
			/>
			<p className="text-sm text-gray-500 mt-2">
				MP4 형식의 영상 파일을 선택해주세요
			</p>
			</div>

			<button
			type="submit"
			disabled={isLoading || !file}
			className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg
					hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
			{isLoading ? '분석 중...' : '자세 분석하기'}
			</button>
		</form>

		{error && (
			<div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
			{error}
			</div>
		)}

		{isLoading && (
			<div className="mt-4 flex justify-center">
			<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
			</div>
		)}

		{videoUrl && (
			<div className="mt-6">
			<h3 className="text-lg font-semibold mb-2">분석 결과</h3>
			<div className="aspect-video bg-black rounded-lg overflow-hidden">
				<video
				controls
				src={videoUrl}
				className="w-full h-full object-contain"
				>
				브라우저가 비디오를 지원하지 않습니다.
				</video>
			</div>
			</div>
		)}
		</div>
	);
}
