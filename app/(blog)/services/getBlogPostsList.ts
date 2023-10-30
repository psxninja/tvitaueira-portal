import sql from '../../lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostsList() {
	const userDb: any = await sql`SELECT
	p.id, p.title, p.slug, p.category, c.title as categorytitle, p.image, p.description, p.createdat, p.updatedat
	FROM posts p
	INNER JOIN categories c
	ON c.slug = p.category
	WHERE highlight = '0'
	ORDER BY createdat DESC
	LIMIT 4`

	return (userDb.length ? userDb : []) as BlogPostsListType[]
}
