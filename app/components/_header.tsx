import HeaderMenu from './HeaderMenu'
import getBlogCategories from '@/app/services/getBlogCategories'
import header from '../styles/header.module.css'

export default async function MainHeader() {
	const categories = await getBlogCategories()

	return (
		<header className={header.header}>
			<div className={header.align}>
				<HeaderMenu categories={categories} />
			</div>
		</header>
	)
}
