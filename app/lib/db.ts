import mysql from 'serverless-mysql'

export const db = mysql({
	library: require('mysql2'),
	config: {
		host: process.env.MYSQL_HOST,
		port: +(process.env.MYSQL_PORT || 3306),
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD
	},
	onConnectError: (e: any) => {
		console.log('Connect Error: ' + e.code, {
			host: process.env.MYSQL_HOST,
			port: +(process.env.MYSQL_PORT || 3306),
			database: process.env.MYSQL_DATABASE,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD
		})
	}
})

export default async function excuteQuery({
	query,
	values
}: {
	query: string
	values?: any[]
}) {
	try {
		const results = await db.query(query, values)
		await db.end()
		return results
	} catch (error) {
		return { error }
	}
}
