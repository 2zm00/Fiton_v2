
'use client';

import AnalyzeUpload from "@/components/analyze/AnalyzeUpload";
import AnalyzeVideo from "@/components/analyze/AnalyzeVideo";

export default function AnalyzePage() {
	return (
		<div className="container mx-auto">
			<AnalyzeUpload />
			<AnalyzeVideo />

		</div>
	)
}