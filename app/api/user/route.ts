import bycript from 'bcryptjs'

export async function GET() {
	const hashedPassword = await bycript.hash('', 10)

	return new Response(JSON.stringify({ pass: hashedPassword }))
}
