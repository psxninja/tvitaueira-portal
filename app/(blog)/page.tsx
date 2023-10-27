import BlogPostList from './components/BlogPostsList'
import BlogHighlights from './components/BlogHighlight'

export default function Home() {
	return (
		<main>
			<BlogHighlights />
			<div className="padding32"></div>
			<BlogPostList />
		</main>
	)
}
