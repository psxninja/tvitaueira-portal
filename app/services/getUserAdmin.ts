import sql from '@/app/lib/db'
import getUserSession from './getUserSession'
import { userInfoType } from '../types/userInfo'

export default async function getUserAdmin() {
	const admins = process.env.ADMINS?.split(',')
	const session = await getUserSession()
	const userid = session?.user?.id

	const userDb: any = await sql`SELECT
	id, username, firstname, lastname, email
	FROM users
	WHERE id = ${userid}`

	return (
		userDb.length && admins?.indexOf(userid + '') !== -1
			? userDb[0]
			: { id: 0 }
	) as userInfoType
}
