import { BlogPostsListType } from '@/app/types/blogPostsList'
import excuteQuery from '@/app/lib/db'

export default async function getBlogPost(postslug: string) {
	let post: BlogPostsListType = {
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
		query: `SELECT id, title, image, content, description, createdat, updatedat
            FROM posts
            WHERE slug = '${postslug}'`
	})

	post = userDb.length ? userDb[0] : post

	return post
}
