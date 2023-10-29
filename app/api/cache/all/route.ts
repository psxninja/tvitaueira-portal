import { revalidatePath } from 'next/cache'

export async function GET() {
	revalidatePath('/', 'layout')
	return new Response(JSON.stringify({ code: '1' }))
}
