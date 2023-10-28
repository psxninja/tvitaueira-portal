import excuteQuery from '@/app/lib/db'
import getUserSession from './getUserSession'

export default async function getUserAdmin() {
	const admins = process.env.ADMINS?.split(',')
	const session = await getUserSession()
	const u = session?.user?.id
	let userInfo: {
		id: number | string
		username: string
		firstname: string
		lastname: string
		email: string
		cpf: string
	} = {
		id: 0,
		username: '',
		firstname: '',
		lastname: '',
		email: '',
		cpf: ''
	}

	if (!u) return userInfo

	const userDb: any = await excuteQuery({
		query: `SELECT id, username, firstname, lastname, email
            FROM users
            WHERE id = '${u}'`
	})

	userInfo = userDb.length ? userDb[0] : {}
	const idAdmin = admins?.indexOf(u + '')

	if (idAdmin !== -1) {
		return userInfo
	}

	return {
		id: 0
	}
}
