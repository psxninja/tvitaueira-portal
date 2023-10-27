import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import getUserAdmin from '@/app/services/getUserAdmin'
import AdminMenu from '@/app/components/AdminMenu'
import FormAddPost from './components/FormAddPost'
import getBlogCategories from './services/getBlogCategories'
import styles from '@/app/styles/admin.module.css'

export const metadata: Metadata = {
	title: 'Publicar nova matéria - TV Itaueira'
}

export default async function AdminAddPost() {
	const userInfo = await getUserAdmin()

	if (!userInfo.id) {
		redirect(`/`)
	}

	const categories = await getBlogCategories()

	return (
		<main className={styles.dashboard}>
			<div>
				<AdminMenu />
			</div>
			<div>
				<div className={styles.dashboardBox}>
					<h3>Publicar nova matéria</h3>
					<FormAddPost categories={categories} />
				</div>
			</div>
		</main>
	)
}
