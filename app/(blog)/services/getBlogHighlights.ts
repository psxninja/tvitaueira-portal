import sql from '../../lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogHighlights() {
	const postsDB: any = await sql`SELECT
	p.id, p.title, p.category, c.title as categorytitle, p.slug, p.image
	FROM posts p
	INNER JOIN categories c
	ON c.slug = p.category
	WHERE highlight = '1'
	ORDER BY p.createdat DESC
	LIMIT 3`

	return (postsDB.length ? postsDB : []) as BlogPostsListType[]
}
