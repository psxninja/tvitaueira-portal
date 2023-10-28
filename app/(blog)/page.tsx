import BlogPostList from './components/BlogPostsList'
import BlogHighlights from './components/BlogHighlight'
import getBlogHighlights from './services/getBlogHighlights'
import getBlogPostsList from './services/getBlogPostsList'

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
