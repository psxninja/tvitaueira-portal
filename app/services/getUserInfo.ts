import excuteQuery from '@/app/lib/db'
import getUserSession from './getUserSession'

export default async function getUserInfo() {
	const session = await getUserSession()
	const u = session?.user?.id
	let userInfo: {
		id: number | string
		firstname: string
		lastname: string
		email: string
		cpf: string
	} = {
		id: 0,
		firstname: '',
		lastname: '',
		email: '',
		cpf: ''
	}

	if (!u) return userInfo

	const userDb: any = await excuteQuery({
		query: `SELECT id, firstname, lastname, email
            FROM users
            WHERE id = '${u}'`
	})

	userInfo = userDb.length ? userDb[0] : {}

	return userInfo
}
