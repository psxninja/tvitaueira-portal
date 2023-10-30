import sql from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPost(postslug: string) {
	const postDb: any = await sql`SELECT
	p.id, p.title, c.title as categorytitle,p.category, p.image,
	p.content, p.description, p.createdat, p.updatedat
	FROM posts p
	INNER JOIN categories c
	ON c.slug = p.category
	WHERE p.slug = ${postslug}`

	return (postDb.length ? postDb[0] : {}) as BlogPostsListType
}
