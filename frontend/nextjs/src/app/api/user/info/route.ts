// app/api/user/info/route.ts
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
try {
// console.log("=".repeat(50))
// console.log("User Info GET 요청 시작 시간:", new Date().toISOString())

const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
// console.log("-".repeat(30))
// console.log("getToken 결과:", JSON.stringify(token, null, 2))

if (!token) {
	return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
}

if (!token.access) {
	return NextResponse.json({ error: "Access token not found" }, { status: 401 })
}

const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/info/`, {
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
// console.log("=".repeat(50))
// console.log("User Info POST 요청 시작 시간:", new Date().toISOString())

const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
// console.log("-".repeat(30))
// console.log("getToken 결과:", JSON.stringify(token, null, 2))

if (!token) {
	return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
}

if (!token.access) {
	return NextResponse.json({ error: "Access token not found" }, { status: 401 })
}

const body = await req.json()
// console.log("Request body:", body)

const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/info/`, {
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
