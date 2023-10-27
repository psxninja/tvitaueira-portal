import excuteQuery from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategories() {
	let categories: BlogCategoriesType[] = []

	const categoryDb: any = await excuteQuery({
		query: `SELECT id, title, slug
            FROM categories`
	})

	categories = categoryDb.length ? categoryDb : categories

	return categories
}
