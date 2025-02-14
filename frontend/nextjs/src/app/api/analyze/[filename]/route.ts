import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { filename: string } }
	) {
		const API_URL = process.env.API_URL;
		const filename = params.filename;

	// 실제 백엔드 API 호출 (캐시 설정 예시)
		const videoData = await fetch(`http://${API_URL}/analyze/${filename}`, {
			next: { revalidate: 60 } // 60초 캐시
	});

	return NextResponse.json(await videoData.json());
	}