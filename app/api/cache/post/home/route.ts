import { revalidatePath } from 'next/cache'

export async function GET() {
	revalidatePath('/(blog)', 'page')
	return new Response(JSON.stringify({ code: '1' }))
}
