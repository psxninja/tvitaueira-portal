import excuteQuery from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategoryMetadata(categoryslug: string) {
	const categoryDb: any = await excuteQuery`SELECT
	title, description
	FROM categories
	WHERE slug = ${categoryslug}`

	return (categoryDb.length ? categoryDb[0] : {}) as BlogCategoriesType
}
