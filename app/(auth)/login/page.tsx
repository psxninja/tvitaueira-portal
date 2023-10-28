import { Metadata } from 'next'
/* import Image from 'next/image'
import Link from 'next/link' */
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'
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
			{/* <Link href="/">
				<Image
					className={styles.headerLogo}
					src="/static/imgs/bellcursos-logo.png"
					width={230}
					height={80}
					alt="Bellcursos"
					title="Voltar para a Home"
					priority
				/>
			</Link> */}
			<div>&nbsp;</div>
			{/* <NotificationProvider> */}
			<LoginForm />
			{/* </NotificationProvider> */}
		</main>
	)
}
