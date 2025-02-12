
import { cookies } from "next/headers"
import { NextResponse } from "next/server"



export async function GET(request: Request) {
	const cookieStore = cookies();
    const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL


	const response = await fetch(`${API_URL}/api/center/`, {
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	})

	if (response.ok) {
		const data = await response.json();
		console.log("전체 센터 리스트", data);
		return NextResponse.json(data);
	} else {
		return NextResponse.json({ error: "Failed to fetch center list" }, { status: response.status })
	}

	const data = await response.json()
	return NextResponse.json(data)
	
	// return NextResponse.json({ error: "center에 대한 GET 요청이 전달되지 않았습니다." }, { status: 500 }
}



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

	const response = await fetch(`${API_URL}/api/center/`, {
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

	


export async function PUT(req: Request) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!token) {
		return NextResponse.json({ error: "center를 위한 token이 전달되지 않았습니다." }, { status: 401 })
	}
	
	const body = await req.json()
	console.log("PUT 요청 body :", body)

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/center/`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		return NextResponse.json(
			{ error: "center에 대한 응답이 전달되지 않았습니다." }, 
			{ status: response.status }
		)
	}

	const data = await response.json()
	return NextResponse.json(data)
}


export async function DELETE(req: Request) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })

	if (!token) {
		return NextResponse.json({ error: "center를 위한 token이 전달되지 않았습니다." }, { status: 401 })
	}
	const body = await req.json()

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/center/`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token.access}`
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		return NextResponse.json(
			{ error: "center에 대한 응답이 전달되지 않았습니다." }, 
			{ status: response.status }
		)
	}

	const data = await response.json()
	return NextResponse.json(data)
}



