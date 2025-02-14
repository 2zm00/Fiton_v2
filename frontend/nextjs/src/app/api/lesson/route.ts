import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
	const cookieStore = cookies();
	const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL


	const response = await fetch(`${API_URL}/api/lesson/`, {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	})

	if (response.ok) {
		const data = await response.json();
		console.log("전체 센터 리스트", data);
		return NextResponse.json(data);
	} else {
		return NextResponse.json({ error: "Failed to fetch lesson list" }, { status: response.status })
	}

}