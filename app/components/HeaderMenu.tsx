'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BlogCategoriesType } from '@/app/types/blogCategories'
import header from '../styles/header.module.css'

export default function HeaderMenu({
	categories
}: {
	categories: BlogCategoriesType[]
}) {
	const [config, setConfig] = useState({
		menuMobile: false
	})

	const clickMenu = () => {
		setConfig((prevState) => ({
			...prevState,
			menuMobile: !prevState.menuMobile
		}))
	}
	return (
		<>
			<div className={header.left}>
				<Link href="/" className={header.title}>
					<h1>TV Itaueira</h1>
				</Link>
			</div>
			<div className={header.right}>
				<ul className={header.menu}>
					<li>
						<Link href="/">As Últimas</Link>
					</li>
					<li>
						<Link
							className="hm"
							href="/internacional"
							data-category="internacional">
							Internacional
						</Link>
					</li>
					<li>
						<Link
							className="hm"
							href="/economia"
							data-category="economia">
							Economia
						</Link>
					</li>
					<li>
						<Link
							className="hm"
							href="/politica"
							data-category="politica">
							Política
						</Link>
					</li>
					<li>
						<Link
							className="hm"
							href="/esporte"
							data-category="esporte">
							Esporte
						</Link>
					</li>
				</ul>
				<div
					className={header.menuHamburguer}
					onClick={() => {
						clickMenu()
					}}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>

			<ul
				className={header.menuMobile}
				data-active={config.menuMobile}
				onClick={() => {
					clickMenu()
				}}>
				<li>
					<Link href="/">As Últimas</Link>
				</li>
				{categories.map((category) => (
					<li key={category.id}>
						<Link
							className="hm"
							href={`/${category.slug}`}
							data-category={category.slug}>
							{category.title}
						</Link>
					</li>
				))}
				<hr />
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
				<div className={header.menuMobileBack}></div>
			</ul>
		</>
	)
}
