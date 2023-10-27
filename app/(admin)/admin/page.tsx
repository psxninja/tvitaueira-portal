import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AdminMenu from '@/app/components/AdminMenu'
import getUserAdmin from '@/app/services/getUserAdmin'
import styles from '@/app/styles/admin.module.css'

export const metadata: Metadata = {
	title: 'Admin - TV Itaueira'
}

export default async function AdminAddPost() {
	const userInfo = await getUserAdmin()

	if (!userInfo.id) {
		redirect(`/login`)
	}

	return (
		<main className={styles.dashboard}>
			<div>
				<AdminMenu />
			</div>
			<div>
				<div className={styles.dashboardBox}>
					<h3>Bem-vindo(a)!</h3>
				</div>
			</div>
		</main>
	)
}
