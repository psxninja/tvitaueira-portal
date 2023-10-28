import { Metadata } from 'next'
import Header from '@/app/components/_header'
import Footer from '@/app/components/_footer'
import getBlogHighlights from '@/app/(blog)/services/getBlogHighlights'
import getBlogPostsList from '@/app/(blog)/services/getBlogPostsList'
import '@/app/styles/global.css'

export const metadata: Metadata = {
	title: 'TV Itaueira',
	description: 'Notícias de Itaueira e Região'
}

export default async function Layout({
	children
}: {
	children: React.ReactNode
}) {
	const highlights = await getBlogHighlights()
	const posts = await getBlogPostsList()

	return (
		<html lang="pt-br">
			<head />
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
