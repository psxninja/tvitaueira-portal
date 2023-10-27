import Link from 'next/link'
import footer from '../styles/footer.module.css'

export default async function MainFooter() {
	return (
		<footer className={footer.footer}>
			<ul className={footer.menu}>
				<li>
					<Link href="/">Sobre a TV Itaueira</Link>
				</li>
				<li>
					<Link href="/">Política de Privacidade</Link>
				</li>
				<li>
					<Link href="/">Termos de Uso</Link>
				</li>
				<li>
					<Link href="/">Fale com a TV Itaueira</Link>
				</li>
			</ul>
			<p>&#169; 2023 TV Itaueira</p>
		</footer>
	)
}
