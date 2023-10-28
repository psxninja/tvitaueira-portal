import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import getUserAdmin from '@/app/services/getUserAdmin'
import AdminMenu from '@/app/components/AdminMenu'
import BlogPostsAllListItem from './components/BlogPostsAllListItem'
import getBlogPostsAllList from './services/getBlogPostsAllList'
import styles from '@/app/styles/admin.module.css'

export const metadata: Metadata = {
	title: 'Todas as matérias - TV Itaueira'
}

export default async function AdminAddPost() {
	const userInfo = await getUserAdmin()

	if (!userInfo.id) {
		redirect(`/`)
	}

	const posts = await getBlogPostsAllList()

	return (
		<main className={styles.dashboard}>
			<div>
				<AdminMenu />
			</div>
			<div>
				<div className={styles.dashboardBox}>
					<h3>Todas as matérias</h3>
					{posts.map((post) => (
						<BlogPostsAllListItem
							post={post}
							key={post.createdat}
						/>
					))}
				</div>
			</div>
		</main>
	)
}
