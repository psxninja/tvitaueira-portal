import excuteQuery from '@/app/lib/db'
import { BlogPostsListType } from '@/app/types/blogPostsList'

export default async function getBlogPostMetadata(postslug: string) {
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

	const postDb: any = await excuteQuery({
		query: `SELECT title, description
            FROM posts
            WHERE slug = '${postslug}'`
	})

	post = postDb.length ? postDb[0] : post

	return post
}
