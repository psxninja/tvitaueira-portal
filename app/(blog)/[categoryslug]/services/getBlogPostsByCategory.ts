import sql from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostByCategory(categoryslug: string) {
	const postsDB: any = await sql`SELECT
	p.id, p.title, p.slug, p.category, c.title as categorytitle, p.image,
	p.description, p.createdat
	FROM posts p
	INNER JOIN categories c
	ON c.slug = p.category
	WHERE p.category = ${categoryslug}
	ORDER BY createdat DESC
	LIMIT 10`

	return (postsDB.length ? postsDB : []) as BlogPostsListType[]
}
