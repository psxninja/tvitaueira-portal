import excuteQuery from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostsDraftList() {
	const postsDB: any = await excuteQuery`SELECT
	p.id, p.title, p.slug, p.category, highlight, p.createdat
	FROM posts p
	WHERE category = '0'
	ORDER BY createdat DESC`

	return (postsDB.length ? postsDB : []) as BlogPostsListType[]
}
