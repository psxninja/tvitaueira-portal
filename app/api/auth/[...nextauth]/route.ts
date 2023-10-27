import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
/* import { encode, decode } from 'next-auth/jwt' */
import CredentialsProvider from 'next-auth/providers/credentials'
/* import GoogleProvider from 'next-auth/providers/google' */
import logIn from '@/app/services/loginUser'

export const authOptions: NextAuthOptions = {
	providers: [
		/* GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}), */
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize(credentials: any) {
				const { username, password } = credentials
				const doLogin = await logIn(username, password)
				return doLogin
			}
		})
	],
	session: {
		strategy: 'jwt'
	},
	/* jwt: { encode, decode }, */
	callbacks: {
		async session({ session, token }) {
			const sessionData: any = session
			sessionData.user = token.user
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				token.user = user
			}
			return token
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login'
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
