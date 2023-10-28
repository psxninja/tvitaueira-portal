import type { Metadata } from 'next'
import Header from '@/app/components/_header'
import Footer from '@/app/components/_footer'
import '@/app/styles/global.css'

export const metadata: Metadata = {
	title: 'TV Itaueira',
	description: 'Notícias de Itaueira e Região'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
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
