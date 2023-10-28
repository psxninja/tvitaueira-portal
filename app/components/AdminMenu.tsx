'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import IconDashboard from './icons/dashboard/IconDashboard'
import IconCategory from './icons/dashboard/IconCategory'
import IconCourse from './icons/dashboard/IconCourse'
import IconStudent from './icons/dashboard/IconStudent'
import IconSale from './icons/dashboard/IconSale'
import IconCoupon from './icons/dashboard/IconCoupon'
import styles from '../styles/adminMenu.module.css'

export default function AdminMenu() {
	/* const router = useRouter()
	const routerPath = router.asPath.split('/')
	const routerActive = routerPath[2] ? routerPath[2] : routerPath[1]
	const routerSubActive = routerActive + '-' + routerPath[3]
	const routerSubSubActive = routerPath[4] */

	const menu = [
		/* {
			path: 'admin',
			name: 'Dashboard',
			link: '/admin',
			icon: IconDashboard
		},
		{
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
			/* icon: IconCourse, */
			childrens: [
				{
					path: 'posts-editar',
					name: 'Criar/Editar matéria',
					link: '/admin/posts/edit'
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
					{item.link === '/admin/postss' ? (
						<a href={item.link}>
							{/* <item.icon data-name={item.path} /> */}
							<span>{item.name}</span>
						</a>
					) : (
						<Link href={item.link}>
							{/* <item.icon data-name={item.path} /> */}
							<span>{item.name}</span>
						</Link>
					)}

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
