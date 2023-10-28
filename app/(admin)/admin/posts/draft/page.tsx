import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import getUserAdmin from '@/app/services/getUserAdmin'
import AdminMenu from '@/app/components/AdminMenu'
import BlogPostsAllListItem from '@/app/(admin)/admin/posts/components/BlogPostsAllListItem'
import getBlogPostsDraftList from '@/app/(admin)/admin/posts/draft/services/getBlogPostsDraftList'
import styles from '@/app/styles/admin.module.css'

export const metadata: Metadata = {
	title: 'Rascunhos - TV Itaueira'
}

export default async function AdminAddPost() {
	const userInfo = await getUserAdmin()

	if (!userInfo.id) {
		redirect(`/`)
	}

	const posts = await getBlogPostsDraftList()

	return (
		<main className={styles.dashboard}>
			<div>
				<AdminMenu />
			</div>
			<div>
				<div className={styles.dashboardBox}>
					<h3>Todas os rascunhos</h3>
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
