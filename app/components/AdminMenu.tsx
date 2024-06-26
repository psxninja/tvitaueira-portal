'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import IconDashboard from './icons/dashboard/IconDashboard'
import styles from '../styles/adminMenu.module.css'
import IconNewspaper from './icons/dashboard/IconNewspaper'

export default function AdminMenu() {
	/* const router = useRouter()
	const routerPath = router.asPath.split('/')
	const routerActive = routerPath[2] ? routerPath[2] : routerPath[1]
	const routerSubActive = routerActive + '-' + routerPath[3]
	const routerSubSubActive = routerPath[4] */

	const menu = [
		{
			path: 'admin',
			name: 'Dashboard',
			link: '/admin',
			icon: IconDashboard
		},
		/* {
			path: 'categorias',
			name: 'Categorias',
			link: '/admin/categorias',
			icon: IconCategory,
			childrens: [
				{
					path: 'categorias-editar',
					name: 'Criar/Editar categoria',
					link: '/admin/categorias/editar'
				}
			]
		}, */
		{
			path: 'posts',
			name: 'Matérias',
			link: '/admin/posts',
			icon: IconNewspaper,
			childrens: [
				{
					path: 'posts-editar',
					name: 'Criar/Editar matéria',
					link: '/admin/posts/edit'
				},
				{
					path: 'posts-draft',
					name: 'Rascunhos',
					link: '/admin/posts/draft'
				}
			]
		} /* ,
		{
			path: 'cupons',
			name: 'Cupons',
			link: '/admin/cupons',
			icon: IconCoupon
		} */
	]

	const itemActive = (path: string): string => {
		return ''
		/* return path === routerActive
			? path === routerSubActive
				? styles.dashboardMenuActiveChildren
				: styles.dashboardMenuActive
			: routerSubActive.startsWith(path)
			? styles.dashboardMenuActiveChildren
			: '' */
	}
	return (
		<ul className={styles.dashboardMenu}>
			{menu.map((item, index) => (
				<li className={itemActive(item.path)} key={index}>
					<Link href={item.link}>
						{item.icon ? <item.icon data-name={item.path} /> : null}
						<span>{item.name}</span>
					</Link>

					{item.childrens ? (
						<ul>
							{item.childrens.map((item2, index2) => (
								<li
									className={itemActive(item2.path)}
									key={index + index2}>
									<Link href={item2.link}>{item2.name}</Link>
								</li>
							))}
						</ul>
					) : (
						''
					)}
				</li>
			))}
		</ul>
	)
}
