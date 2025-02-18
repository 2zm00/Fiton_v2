'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
useEffect(() => {
console.error(error); // 에러 로그 출력
}, [error]);

return (
	<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
		<h1 className="text-3xl font-bold text-red-600 mb-4">오류가 발생했습니다!</h1>
		<p className="text-gray-700 mb-6">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
		<div className="flex space-x-4">
		{/* 새로고침 버튼 */}
		<button
			onClick={() => reset()}
			className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
		>
			다시 시도
		</button>
		{/* 홈으로 이동 */}
		<a
			href="/"
			className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
		>
			홈으로 이동
		</a>
		</div>
	</div>
);
}
