import { BlogPostsListType } from '@/app/types/blogPostsList'
import excuteQuery from '../../lib/db'

export default async function getBlogPostsList() {
	let posts: BlogPostsListType[] = []

	const userDb: any = await excuteQuery({
		query: `SELECT p.id, p.title, p.slug, p.category, c.title as categorytitle, p.image, p.description, p.createdat, p.updatedat
            FROM posts p
			INNER JOIN categories c
			ON c.slug = p.category
			WHERE highlight = '0'
			ORDER BY createdat DESC
            LIMIT 4`
	})

	posts = userDb.length ? userDb : posts

	return posts
}
