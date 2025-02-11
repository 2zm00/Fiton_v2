import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
	const cookieStore = cookies()

	;(await cookieStore).delete("access_token")

	return NextResponse.json({ success : true })
}