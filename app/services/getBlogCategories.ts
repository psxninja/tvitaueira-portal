import sql from '@/app/lib/db'
import { BlogCategoriesType } from '@/app/types/blogCategories'

export default async function getBlogCategories() {
	const categoryDb: any = await sql`SELECT id, title, slug FROM categories`

	return (categoryDb.length ? categoryDb : []) as BlogCategoriesType[]
}
