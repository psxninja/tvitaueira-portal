import excuteQuery from '../lib/db'
import bcrypt from 'bcryptjs'

export default async function logIn(username: string, password: string) {
	const usermail = username.indexOf('@')
	const byuser =
		usermail !== -1
			? `WHERE email = '${username}'`
			: `WHERE username = '${username}'`
	try {
		const user: any = await excuteQuery({
			query: `SELECT id, firstname, password
              FROM users
              ${byuser}
              LIMIT 1`
		})

		if (user.length === 0) return null

		const thisUser = user[0]
		const checkPass = await bcrypt.compare(password, thisUser.password)

		if (checkPass) {
			return {
				id: thisUser.id || '',
				firstname: thisUser.firstname || '',
				picture: thisUser.picture || ''
			}
		}

		return null
	} catch (error) {
		return null
	}
}
