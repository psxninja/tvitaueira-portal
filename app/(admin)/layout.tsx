import type { Metadata } from 'next'
import Header from '../components/_adminHeader'
import '../styles/global.css'

export const metadata: Metadata = {
	title: 'TV Itaueira - Admin'
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
			</body>
		</html>
	)
}
