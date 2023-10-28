'use client'

import Link from 'next/link'
import { SyntheticEvent } from 'react'
import { format, register } from 'timeago.js'
import { localeFunc } from '@/app/helpers/timeago'
import { BlogPostsListType } from '@/app/types/blogPostsList'
import blog from '@/app/styles/adminBlog.module.css'

register('pt-BR', localeFunc)

export default function BlogPostsAllListItem({
	post
}: {
	post: BlogPostsListType
}) {
	const setHighligh = (evt: SyntheticEvent<EventTarget>) => {
		const input = evt.target as HTMLFormElement
		const value = input.value
		fetch('/api/posts/highlight', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: value,
				h: input.checked ? '1' : '0'
			})
		})
			.then((res) => res.json())
			.then(async (data) => {
				/* input.checked = !input.checked */
			})
	}

	return (
		<div className={blog.post}>
			<div className={blog.postItem}>
				<div className={blog.highlight}>
					<span>Highlight</span>
					<input
						type="checkbox"
						defaultValue={post.id}
						defaultChecked={post.highlight ? true : false}
						onChange={setHighligh}
					/>
				</div>
				<div>
					<span
						className={blog.category}
						data-category={post.category}>
						{post.categorytitle}
					</span>
					<Link href={`/admin/posts/edit/${post.slug}`}>
						<h3 className={blog.h3}>{post.title}</h3>
					</Link>
					<span>{format(+post.createdat * 1000, 'pt-BR')}</span>
				</div>
			</div>
		</div>
	)
}
