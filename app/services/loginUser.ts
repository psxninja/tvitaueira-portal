import sql from '../lib/db'
import bcrypt from 'bcryptjs'

export default async function logIn(username: string, password: string) {
	try {
		const user: any =
			username.indexOf('@') !== -1
				? await sql`SELECT id, firstname, password
		FROM users
		WHERE email = ${username}
		LIMIT 1`
				: await sql`SELECT id, firstname, password
		FROM users
		WHERE username = ${username}
		LIMIT 1`

		if (user.length === 0) return null

		const checkPass = await bcrypt.compare(password, user[0].password)

		if (checkPass)
			return {
				id: user[0].id || '',
				firstname: user[0].firstname || '',
				picture: user[0].picture || ''
			}

		return null
	} catch {
		return null
	}
}
