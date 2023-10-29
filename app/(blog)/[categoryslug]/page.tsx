import getBlogPostByCategory from './services/getBlogPostsByCategory'
import getBlogCategoryMetadata from './services/getBlogCategoryMetadata'
import BlogPostListItem from '@/app/(blog)/[categoryslug]/components/BlogPostsListItem'
import blog from '@/app/styles/blog.module.css'

interface PostTypes {
	params: {
		categoryslug: string
	}
}

export async function generateMetadata({ params }: PostTypes) {
	const category = await getBlogCategoryMetadata(params.categoryslug)

	return {
		title: `${category.title} | TV Itaueira`,
		description: category.description
	}
}

export default async function BlogPostByCategory({ params }: PostTypes) {
	const category = await getBlogCategoryMetadata(params.categoryslug)
	const posts = await getBlogPostByCategory(params.categoryslug)

	return (
		<main>
			<h2 className={blog.categoryTitle} data-category={posts[0].category}>
				{category.title}
			</h2>
			<div className={blog.blog}>
				{posts.map((post) => (
					<BlogPostListItem post={post} key={post.createdat} />
				))}
			</div>
		</main>
	)
}
