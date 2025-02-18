import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { filename: string } }
	) {
		const FAST_API_URL = process.env.NEXT_PUBLIC_FAST_API_URL;
		const { filename } = await params;

	// 실제 백엔드 API 호출 (캐시 설정 예시)
		const videoData = await fetch(`${FAST_API_URL}/api/analyze/${filename}`, {
    next: { revalidate: 60 }
});


	return NextResponse.json(await videoData.json());
	}