import excuteQuery from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategories() {
	const userDb: any = await excuteQuery`SELECT
	id, title, slug
	FROM categories`

	return (userDb.length ? userDb : []) as BlogCategoriesType[]
}
