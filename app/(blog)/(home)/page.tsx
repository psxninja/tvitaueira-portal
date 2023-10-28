import BlogPostList from '@/app/(blog)/components/BlogPostsList'
import BlogHighlights from '@/app/(blog)/components/BlogHighlight'
import getBlogHighlights from '@/app/(blog)/services/getBlogHighlights'
import getBlogPostsList from '@/app/(blog)/services/getBlogPostsList'

export default async function Home() {
	const highlights = await getBlogHighlights()
	const posts = await getBlogPostsList()

	return (
		<main>
			<BlogHighlights posts={highlights} />
			<div className="padding32"></div>
			<BlogPostList posts={posts} />
		</main>
	)
}
