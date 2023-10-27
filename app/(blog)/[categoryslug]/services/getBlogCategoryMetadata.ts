import excuteQuery from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategoryMetadata(categoryslug: string) {
	let category: BlogCategoriesType = {
		id: '',
		title: '',
		description: '',
		slug: ''
	}

	const categoryDb: any = await excuteQuery({
		query: `SELECT title, description
            FROM categories
			WHERE slug = '${categoryslug}'`
	})

	category = categoryDb.length ? categoryDb[0] : category

	return category
}
