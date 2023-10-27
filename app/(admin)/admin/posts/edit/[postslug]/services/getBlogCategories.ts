import excuteQuery from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategories() {
	let categories: BlogCategoriesType[] = []

	const userDb: any = await excuteQuery({
		query: `SELECT id, title, slug
            FROM categories`
	})

	categories = userDb.length ? userDb : categories

	return categories
}
