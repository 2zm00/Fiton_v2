import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  question: z.string().min(1).max(500)
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { question } = schema.parse(json);
    
    const encodedQuestion = encodeURIComponent(question);
    const fastapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_FAST_API_URL}/api/chat/?question=${encodedQuestion}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    );

    if (!fastapiRes.ok) throw new Error('백엔드 연결 실패');
    const { answer } = await fastapiRes.json();

    return NextResponse.json({ answer });
    
  } catch (error) {
    return NextResponse.json(
      { error: '처리 중 오류 발생' },
      { status: 500 }
    );
  }
}
