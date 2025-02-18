
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

	


export async function PUT(request: Request) {
	const cookieStore = cookies()
	const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL;
	console.log("TOKEN : ", accessToken);

	if (!accessToken) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	};

	const body = await request.json();
	console.log("PUT 요청 body :", body)

	const response = await fetch(`${API_URL}/api/center/`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(body)
	})
	console.log("PUT 요청 response :", response);

	if (response.ok) {
		return NextResponse.json({ success: true })
	} else {
	return NextResponse.json({ error: "Failed to add center info" }, { status: response.status })
	}
}


export async function DELETE(request: Request) {
	const cookieStore = cookies()
	const accessToken = (await cookieStore).get("access_token")?.value;
	const API_URL = process.env.API_URL;
	console.log("TOKEN : ", accessToken);

	if (!accessToken) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	};

	const body = await request.json();
	console.log("DELETE 요청 body :", body)

	const response = await fetch(`${API_URL}/api/center/`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(body)
	})
	console.log("DELETE 요청 response :", response);

	if (response.ok) {
		return NextResponse.json({ success: true })
	} else {
	return NextResponse.json({ error: "Failed to add center info" }, { status: response.status })
	}
}



