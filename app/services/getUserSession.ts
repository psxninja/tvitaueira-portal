import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { SessionUser } from '@/app/types/session'

export default async function getUserSession() {
	const session = (await getServerSession(
		authOptions
	)) as unknown as SessionUser
	return session
}
