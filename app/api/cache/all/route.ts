import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: { postslug: string } }
) {
	if (!params.postslug) {
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	}
	revalidatePath('/', 'layout')
	return new Response(JSON.stringify({ code: '1' }))
}
