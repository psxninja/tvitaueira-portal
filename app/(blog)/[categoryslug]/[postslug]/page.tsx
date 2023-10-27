import Image from 'next/image'

import { format, register } from 'timeago.js'
import { localeFunc } from '@/app/helpers/timeago'
import getBlogPost from './services/getBlogPost'
import getBlogPostMetadata from './services/getBlogPostMetadata'
import blog from '@/app/styles/blog.module.css'

register('pt-BR', localeFunc)

interface PostTypes {
	params: {
		postslug: string
	}
}

export async function generateMetadata({ params }: PostTypes) {
	const post = await getBlogPostMetadata(params.postslug)

	return {
		title: `${post.title} | TV Itaueira`,
		description: post.description
	}
}

export default async function BlogPost({ params }: PostTypes) {
	const post = await getBlogPost(params.postslug)

	const createdatTime = new Date(+post.createdat * 1000)
	const updatedatTime = new Date(+post.updatedat * 1000)
	const createdday = (createdatTime.getDate() + '').padStart(2, '0')
	const createdmonth = (createdatTime.getMonth() + 1 + '').padStart(2, '0')
	const createdyear = createdatTime.getFullYear()
	const createdhours = (createdatTime.getHours() + '').padStart(2, '0')
	const createdminutes = (createdatTime.getMinutes() + '').padStart(2, '0')

	const updatedday = (updatedatTime.getDate() + '').padStart(2, '0')
	const updatedmonth = (updatedatTime.getMonth() + 1 + '').padStart(2, '0')
	const updatedyear = updatedatTime.getFullYear()
	const updatedhours = (updatedatTime.getHours() + '').padStart(2, '0')
	const updatedminutes = (updatedatTime.getMinutes() + '').padStart(2, '0')

	const createdat = `${createdday}/${createdmonth}/${createdyear} às ${createdhours}:${createdminutes}`
	const updated = `${updatedday}/${updatedmonth}/${updatedyear} às ${updatedhours}:${updatedminutes}`

	return (
		<main>
			<div className={blog.postfull}>
				<h2>{post.title}</h2>
				<p className={blog.description}>{post.description}</p>
				<span className={blog.timeago}>
					{createdat}
					{post.updatedat !== '0' ? ` | Atualizado ${updated}` : ` | Atualizado ${createdat}`}
				</span>
				<div className={blog.image}>
					<Image
						src={`/imgs/posts/${post.image}`}
						width={600}
						height={400}
						alt={post.title}
						priority
					/>
				</div>
				<div
					className={blog.content}
					dangerouslySetInnerHTML={{
						__html: post.content
					}}></div>
			</div>
		</main>
	)
}
