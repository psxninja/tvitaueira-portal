'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import header from '../styles/header.module.css'

export default async function MainHeader() {
	const logout = () => {
		signOut()
	}

	return (
		<header className={header.header}>
			<div className={header.align}>
				<Link href="/" className={header.title}>
					<h1>TV Itaueira</h1>
				</Link>
				<div onClick={logout} className={header.logout}>
					Sair
				</div>
			</div>
		</header>
	)
}
