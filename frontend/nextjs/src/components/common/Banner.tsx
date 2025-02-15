'use client';

import { MINIO_URL } from "@/lib/config";


export default function Banner() {
	return (
		<section className="relative w-full h-[800px] mb-8 overflow-hidden">
	<video
		autoPlay
		muted
		loop
		playsInline
		className="absolute top-0 left-0 w-full h-full object-cover"
	>
		<source src={`${MINIO_URL}/nextjs/videos/banner.mp4`} type="video/mp4" />
	</video>
	<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
		<div className="text-center text-white">
		<h2 className="text-4xl font-bold mb-4">Welcome to Fiton</h2>
		<p className="text-xl">당신의 건강한 라이프스타일을 위한 최고의 선택</p>
		</div>
	</div>
	</section>
	);
}
