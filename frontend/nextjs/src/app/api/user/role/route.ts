import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	try {
	console.log("=".repeat(50))
	console.log("API 요청 시작 시간:", new Date().toISOString())

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	console.log("-".repeat(30))
	console.log("getToken 결과:", JSON.stringify(token, null, 2))
	console.log("Username:", token?.username)
	console.log("역할:", token?.role)

	if (!token) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
	}

	if (!token.access) {
		return NextResponse.json({ error: "Access token not found" }, { status: 401 })
	}

	console.log("Access Token:", token.access)

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/role/`, {
		headers: {
		'Authorization': `Bearer ${token.access}`
		}
	})



	if (!response.ok) {
		return NextResponse.json(
		{ error: "API request failed" }, 
		{ status: response.status }
		)
	}

	const data = await response.json()
	return NextResponse.json(data)
	} catch (error) {
	console.error("Error:", error)
	return NextResponse.json(
		{ error: "Internal server error" }, 
		{ status: 500 }
	)
	}
	}

export async function POST(req: Request) {
	try {
		console.log("=".repeat(50))
		console.log("Role POST 요청 시작 시간:", new Date().toISOString())
	
		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
		console.log("-".repeat(30))
		console.log("getToken 결과:", JSON.stringify(token, null, 2))
	
		if (!token) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
		}
	
		if (!token.access) {
		return NextResponse.json({ error: "Access token not found" }, { status: 401 })
		}
	
		const body = await req.json()
		console.log("Request body:", body)
	
		const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/role/`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
		})
	
		if (!response.ok) {
		return NextResponse.json(
			{ error: "API request failed" }, 
			{ status: response.status }
		)
		}
	
		const data = await response.json()
		return NextResponse.json(data)
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json(
		{ error: "Internal server error" }, 
		{ status: 500 }
		)
	}
}
