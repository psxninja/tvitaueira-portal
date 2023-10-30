import { Metadata } from 'next'
/* import Image from 'next/image'
import Link from 'next/link' */
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import IconTVItaueira from '@/app/components/icons/logo'
import LoginForm from './components/LoginForm'
/* import { NotificationProvider } from '../../contexts/Notification' */
import styles from '../../styles/login.module.css'

export const metadata: Metadata = {
	title: 'Entrar - TV Itaueira'
}

export default async function LoginPage() {
	const session = await getServerSession(authOptions)

	if (session) {
		redirect('/')
	}

	return (
		<main className={styles.login}>
			<Link href="/">
				<IconTVItaueira />
			</Link>
			<div>&nbsp;</div>
			{/* <NotificationProvider> */}
			<LoginForm />
			{/* </NotificationProvider> */}
		</main>
	)
}
