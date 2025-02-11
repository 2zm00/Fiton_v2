import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL


    if (!accessToken) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const response = await fetch(`${API_URL}/api/user/role/`,{
		headers: {
            Authorization: `Bearer ${accessToken}`,
        },
	})
	console.log("회원 정보 응답 : ", response)

	if (response.ok) {
		const data = await response.json()
		console.log("회원 정보 data : ", data)
		return NextResponse.json(data)
	} else {
		return NextResponse.json({ error: "회원 정보 data를 불러오는데 실패했습니다." }, { status: response.status })
	}
}

export async function POST(request: Request){
	const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;
    const API_URL = process.env.API_URL

    if (!accessToken) {
        return NextResponse.json({ error: "회원 역할 POST : Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("등록할 회원 역할 : ", body)

    const response = await fetch(`${API_URL}/api/user/role/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    })

	if (response.ok) {
		return NextResponse.json({ success: true })
		} else {
            return NextResponse.json({ error: "회원 역할 등록 실패" }, { status: response.status })
		}
        
}
