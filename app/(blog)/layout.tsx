import type { Metadata } from 'next'
import Header from '@/app/components/_header'
import Footer from '@/app/components/_footer'
import '@/app/styles/global.css'

export const metadata: Metadata = {
	title: 'TV Itaueira - O seu portal de notícias',
	description:
		'Últimas Notícias de Itaueira Piauí e do mundo, com reportagens e vídeos sobre política, economia, ciência, saúde, tecnologia, carros e mais.'
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
