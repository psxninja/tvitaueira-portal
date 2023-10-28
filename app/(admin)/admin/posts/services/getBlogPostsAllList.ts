import excuteQuery from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostsAllList() {
	let posts: BlogPostsListType[] = []

	const postsDB: any = await excuteQuery({
		query: `SELECT p.id, p.title, p.slug, p.category, c.title as categorytitle, highlight, p.createdat
            FROM posts p
			INNER JOIN categories c
			ON c.slug = p.category
			ORDER BY createdat DESC`
	})

	posts = postsDB.length ? postsDB : []

	return posts
}
