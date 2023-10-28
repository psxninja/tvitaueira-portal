'use client'

import { format, register } from 'timeago.js'
import { localeFunc } from '@/app/helpers/timeago'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostsListType } from '@/app/types/blogPostsList'
import blog from '@/app/styles/blog.module.css'

register('pt-BR', localeFunc)

export default function BlogPostListItem({
	post
}: {
	post: BlogPostsListType
}) {
	return (
		<div className={blog.post}>
			<div>
				<Link href={`${post.category}/${post.slug}`}>
					<h3>{post.title}</h3>
					<p>{post.description}</p>
				</Link>
				<span className={blog.timeago}>
					{format(+post.createdat * 1000, 'pt-BR')}
				</span>
			</div>
			<div>
				<Link href={`${post.category}/${post.slug}`}>
					<Image
						src={`posts/${post.image}?u=${
							post.updatedat || post.createdat
						}`}
						width={810}
						height={540}
						alt={post.title}
					/>
				</Link>
			</div>
		</div>
	)
}
