import sql from '@/app/lib/db'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { SqlResponse } from '@/app/types/sqlResponse'

export async function POST(req: NextRequest) {
	const { id, h } = await req.json()

	const setHighlight = (await sql`UPDATE posts SET
	highlight = ${h}
	WHERE id = ${id}`) as SqlResponse

	if (!setHighlight.affectedRows) {
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	}

	revalidatePath('/(blog)', 'page')
	revalidatePath(`/(admin)/admin/posts`, 'page')
	revalidatePath(`/(admin)/admin/posts/draft`, 'page')

	return new Response(JSON.stringify({ code: '1' }))
}
