import excuteQuery from '@/app/lib/db'
import { SqlResponse } from '@/app/types/sqlResponse'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	const { id, h } = await req.json()

	const setHighlight = (await excuteQuery({
		query: `UPDATE posts SET
			highlight=?
			WHERE id = '${id}'`,
		values: [h]
	})) as SqlResponse

	if (!setHighlight.affectedRows) {
		return new Response(JSON.stringify({ code: '2' }))
	}

	return new Response(JSON.stringify({ code: '1' }))
}
