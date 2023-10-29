import BlogPostListItem from './BlogPostsListItem'
import getBlogPostsList from '@/app/(blog)/services/getBlogPostsList'
import blog from '../../styles/blog.module.css'

export default async function BlogPostList() {
	const posts = await getBlogPostsList()

	return (
		<div className={blog.blog}>
			{posts.map((post) => (
				<BlogPostListItem post={post} key={post.createdat} />
			))}
		</div>
	)
}
