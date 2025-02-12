
import { cookies } from "next/headers"
import { NextResponse } from "next/server"



export async function GET(request: Request, { params }: { params: {id: string}}) {
	const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL
	const centerId = {
		id : Number(params.id),
	}
	const response = await fetch(`${API_URL}/api/center/detail`,{
		headers: {
            Authorization: `Bearer ${accessToken}`,
        },
		body: JSON.stringify(centerId),
	})
	if (response.ok) {
		const data = await response.json();
		console.log(data);
        return NextResponse.json(data);
	} else {
		return NextResponse.json( { error: response }, { status: response.status})
	}
}


// 센터 상세정보 받기 body에 {"center_id":1} 로 받아와야함.
// 조회 타입 정의 params 사용해서 id 받아오기