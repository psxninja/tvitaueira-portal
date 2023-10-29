import excuteQuery from '@/app/lib/db'
import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { SqlResponse } from '@/app/types/sqlResponse'

export async function POST(req: NextRequest) {
	const { id, h } = await req.json()

	const setHighlight = (await excuteQuery({
		query: `UPDATE posts SET
			highlight=?
			WHERE id = '${id}'`,
		values: [h]
	})) as SqlResponse

	if (!setHighlight.affectedRows) {
		return new Response(JSON.stringify({ code: '2' }), { status: 400 })
	}

	revalidatePath('/(blog)', 'page')

	return new Response(JSON.stringify({ code: '1' }))
}
