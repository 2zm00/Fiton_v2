export const dynamic = 'force-static'

import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	console.log(JSON.stringify(token, null, 2))
	if (!token) {
		return NextResponse.json({ error: "center를 위한 token이 전달되지 않았습니다." }, { status: 401 })
	}
	
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/center/`, {
		headers: {
			'Authorization': `Bearer ${token.access}`
		}
	})

	if (!response.ok) {
		return NextResponse.json(
			{ error: "center에 대한 응답이 전달되지 않았습니다." }, 
			{ status: response.status }
		)
	}

	const data = await response.json()
	return NextResponse.json(data)
	
	// return NextResponse.json({ error: "center에 대한 GET 요청이 전달되지 않았습니다." }, { status: 500 }
}



export async function POST(req: Request) {
	try{

	
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!token) {
		return NextResponse.json({ error: "center를 위한 token이 전달되지 않았습니다." }, { status: 401 })
	}
	const body = await req.json()
	console.log("POST 요청 body :", body)

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/center/`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	console.log("POST 요청 response :", response)

	if (!response.ok) {
		return NextResponse.json(
			{ error: "center에 대한 응답이 전달되지 않았습니다." }, 
			{ status: response.status }
		)
	}

	const data = await response.json()
	return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({error: "센터 추가 실패했습니다."}, {status: 500})
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
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

	if (!token) {
		return NextResponse.json({ error: "center를 위한 token이 전달되지 않았습니다." }, { status: 401 })
	}
	
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/center/`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token.access}`
		}
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



