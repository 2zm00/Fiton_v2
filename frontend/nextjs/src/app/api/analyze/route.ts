import { cookies } from "next/headers"
import { NextResponse } from "next/server"





export async function POST(request: Request) {
	const cookieStore = cookies()
	const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL;
	console.log("TOKEN : ", accessToken);
	
	if (!accessToken) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	};

	const body = await request.json();
	console.log("POST 요청 body :", body)

	const response = await fetch(`${API_URL}/analyze/`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(body)
	})
	console.log("POST 요청 response :", response);

	if (response.ok) {
		return NextResponse.json({ success: true })
	} else {
	return NextResponse.json({ error: "Failed to add center info" }, { status: response.status })
	}
}