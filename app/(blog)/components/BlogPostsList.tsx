import BlogPostListItem from './BlogPostsListItem'
import { BlogPostsListType } from '@/app/types/blogPostsList'
import blog from '../../styles/blog.module.css'

export default async function BlogPostList({
	posts
}: {
	posts: BlogPostsListType[]
}) {
	return (
		<div className={blog.blog}>
			<h2>Últimas notícias</h2>
			{posts.map((post) => (
				<BlogPostListItem post={post} key={post.createdat} />
			))}
		</div>
	)
}
