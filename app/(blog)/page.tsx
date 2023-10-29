import BlogPostList from '@/app/(blog)/components/BlogPostsList'
import BlogHighlights from '@/app/(blog)/components/BlogHighlight'

export default async function Home() {
	return (
		<main>
			<div>
				<BlogHighlights />
				<div className="padding64"></div>
				<BlogPostList />
				<div className="padding64"></div>
			</div>
		</main>
	)
}
