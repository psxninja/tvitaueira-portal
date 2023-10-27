import { Metadata } from 'next'
import AdminMenu from '@/app/components/AdminMenu'
import FormEditPost from './components/FormEditPost'
import getBlogPostBySlug from './services/getBlogPostBySlug'
import getBlogCategories from './services/getBlogCategories'
import styles from '@/app/styles/admin.module.css'

interface EditPostTypes {
	params: {
		postslug: string
	}
}

export const metadata: Metadata = {
	title: 'Editar matéria - TV Itaueira'
}

export default async function AdminEditPost({ params }: EditPostTypes) {
	const post = await getBlogPostBySlug(params.postslug)
	const categories = await getBlogCategories()

	return (
		<main className={styles.dashboard}>
			<div>
				<AdminMenu />
			</div>
			<div>
				<div className={styles.dashboardBox}>
					<h3>Editar matéria</h3>
					<FormEditPost categories={categories} post={post} />
				</div>
			</div>
		</main>
	)
}
