import BlogPostList from './components/BlogPostsList'
import BlogHighlights from './components/BlogHighlight'
import getBlogHighlights from './services/getBlogHighlights'
import getBlogPostsList from './services/getBlogPostsList'
import { BlogPostsListType } from '../types/blogPostsList'

export default function Home({
	highlights,
	posts
}: {
	highlights: BlogPostsListType[]
	posts: BlogPostsListType[]
}) {
	return (
		<main>
			<BlogHighlights posts={highlights} />
			<div className="padding32"></div>
			<BlogPostList posts={posts} />
		</main>
	)
}

export async function getServerSideProps(context: any) {
	const highlights = await getBlogHighlights()
	const posts = await getBlogPostsList()

	return {
		props: {
			highlights,
			posts
		}
	}
}
