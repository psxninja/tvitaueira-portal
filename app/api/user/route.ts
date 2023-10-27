import { NextRequest } from 'next/server'
import bycript from 'bcryptjs'

export async function GET(req: NextRequest) {
    const hashedPassword = await bycript.hash('', 10)

	return new Response(JSON.stringify({ pass: hashedPassword }))
}