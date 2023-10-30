import sql from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostBySlug(postslug: string) {
	const userDb: any = await sql`SELECT
	id, title, slug, category, visible, image, description, content, createdat
	FROM posts
	WHERE slug = ${postslug}`

	return (userDb.length ? userDb[0] : {}) as BlogPostsListType
}
