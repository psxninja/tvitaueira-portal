import sql from '@/app/lib/db'
import getUserSession from './getUserSession'
import { userInfoType } from '../types/userInfo'

export default async function getUserInfo() {
	const session = await getUserSession()
	const userid = session?.user?.id

	const userDb: any = await sql`SELECT
	id, firstname, lastname, email
	FROM users
	WHERE id = ${userid}`

	return (userDb.length ? userDb[0] : {}) as userInfoType
}
