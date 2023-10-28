import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(
	req: NextRequest,
	{ params }: { params: { postslug: string } }
) {
	if (!params.postslug) {
		return new Response(JSON.stringify({ code: '1' }), { status: 400 })
	}
	revalidatePath('/(blog)', 'page')
	revalidatePath(`/(admin)/posts`, 'page')
	revalidatePath(`/(admin)/posts/draft`, 'page')
	revalidatePath(`/(blog)/[categoryslug]/${params.postslug}`, 'page')
	return new Response(JSON.stringify({ code: '1' }))
}
