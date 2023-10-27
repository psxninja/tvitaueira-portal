import excuteQuery from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostBySlug(postslug: string) {
	let posts: BlogPostsListType = {
		id: '',
		title: '',
		slug: '',
		category: '',
		visible: 0,
		highlight: 0,
		image: '',
		categorytitle: '',
		description: '',
		content: '',
		createdat: '',
		updatedat: ''
	}

	const userDb: any = await excuteQuery({
		query: `SELECT id, title, slug, category, visible, image, description, content, createdat
            FROM posts
            WHERE slug = '${postslug}'`
	})

	posts = userDb.length ? userDb[0] : posts

	return posts
}
