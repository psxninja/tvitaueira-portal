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

	const postDb: any = await excuteQuery({
		query: `SELECT p.id, p.title, c.title as categorytitle, p.category, p.image, p.content, p.description, p.createdat, p.updatedat
            FROM posts p
			INNER JOIN categories c
			ON c.slug = p.category
            WHERE p.slug = '${postslug}'`
	})

	post = postDb.length ? postDb[0] : post

	return post
}
