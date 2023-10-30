import sql from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostMetadata(postslug: string) {
	const postDb: any = await sql`SELECT
	title, description
	FROM posts
	WHERE slug = ${postslug}`

	return (postDb.length ? postDb[0] : {}) as BlogPostsListType
}
