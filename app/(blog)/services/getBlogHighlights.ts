import excuteQuery from '../../lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogHighlights() {
	let posts: BlogPostsListType[] = []

	const userDb: any = await excuteQuery({
		query: `SELECT p.id, p.title, p.category, c.title as categorytitle, p.slug, p.image
            FROM posts p
			INNER JOIN categories c
			ON c.slug = p.category
			WHERE highlight = '1'
			ORDER BY p.createdat DESC
            LIMIT 3`
	})

	posts = userDb.length ? userDb : posts

	return posts
}
