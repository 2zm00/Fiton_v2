import { NextResponse } from "next/server";


export async function POST(request: Request) {
	const body = await request.json()
	const { username, password } = body
	const API_URL = process.env.API_URL

	const response = await fetch(`${API_URL}/api/register/`, {
		method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
	})
	console.log("회원가입 응답 : ",response)

	if (response.ok) {
        return NextResponse.json({ success: true}, { status: 201 });
    } else {
        return NextResponse.json({error: "회원가입 실패" }, { status: 400 });
    }

}


