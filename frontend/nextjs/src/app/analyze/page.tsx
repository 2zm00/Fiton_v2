
'use client';

import AnalyzeUpload from "@/components/analyze/AnalyzeUpload";
import AnalyzeVideo from "@/components/analyze/AnalyzeVideo";

export default function AnalyzePage() {
	return (
		<div className="container mx-auto px-4 py-8">
	<h1 className="text-3xl font-bold mb-8 text-center">자세분석</h1>
	<p className="text-gray-600 mb-4 text-center">
			운동 영상을 업로드하여 자세를 분석해보세요.
		</p>
	


		<AnalyzeUpload />
		<AnalyzeVideo />

	</div>
);
}