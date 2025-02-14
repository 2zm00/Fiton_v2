'use client';

import { useState } from "react";



export default function AnalyzeVideo() {
	const [filename, setFilename] = useState('');
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const res = await fetch(`/api/analyze/${encodeURIComponent(filename)}`);
			if (!res.ok) throw new Error('영상 조회 실패');
			
			const data = await res.json();
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
			<form onSubmit={handleSubmit} className="mb-6">
			<input
				type="text"
				value={filename}
				onChange={(e) => setFilename(e.target.value)}
				placeholder="파일명 입력 (예: pose_dead.mp4)"
				className="border p-2 w-full rounded-lg mb-2"
			/>
			<button
				type="submit"
				disabled={isLoading}
				className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
			>
				{isLoading ? '로딩 중...' : '영상 조회'}
			</button>
			</form>
	
			{error && <div className="text-red-500 mb-4">{error}</div>}
	
			{videoUrl && (
			<div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
				<video
				controls
				src={videoUrl}
				className="w-full h-full object-cover"
				>
				브라우저가 비디오를 지원하지 않습니다.
				</video>
			</div>
			)}
		</div>
		);
	}