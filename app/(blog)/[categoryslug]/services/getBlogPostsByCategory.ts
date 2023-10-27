import { BlogPostsListType } from '@/app/types/blogPostsList'
import excuteQuery from '@/app/lib/db'

export default async function getBlogPostByCategory(categoryslug: string) {
	let posts: BlogPostsListType[] = []

	const userDb: any = await excuteQuery({
		query: `SELECT p.id, p.title, p.slug, p.category, c.title as categorytitle, p.image, p.description, p.createdat
            FROM posts p
			INNER JOIN categories c
			ON c.slug = p.category
			WHERE p.category = '${categoryslug}'
			ORDER BY createdat DESC
            LIMIT 10`
	})

	posts = userDb.length ? userDb : posts

	return posts
}
