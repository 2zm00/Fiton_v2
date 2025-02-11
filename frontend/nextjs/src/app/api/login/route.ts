import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body
  const API_URL = process.env.API_URL

  const response = await fetch(`${API_URL}/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  console.log("로그인 응답 : ", response)

  if (response.ok) {
    const data = await response.json()
    const { access, refresh } = data

    // Set the access token as an HTTP-only cookie
    const headers = new Headers()
    headers.append("Set-Cookie", `access_token=${access}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`)

    return NextResponse.json({ success: true }, { headers })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}