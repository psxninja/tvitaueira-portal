import Image from 'next/image'
import Link from 'next/link'
import { BlogPostsListType } from '@/app/types/blogPostsList'
import highlights from '@/app/styles/highlights.module.css'

export default async function BlogHighlights({
	posts
}: {
	posts: BlogPostsListType[]
}) {
	return (
		<div className={highlights.highlights}>
			<div className={highlights.hone}>
				<Link
					href={`${posts[0].category}/${posts[0].slug}`}
					className={highlights.honec}>
					<div className={highlights.content}>
						<span
							className={highlights.category}
							data-category={posts[0].category}>
							{posts[0].categorytitle}
						</span>
						<h3>{posts[0].title}</h3>
					</div>
					<Image
						src={`posts/${posts[0].image}`}
						style={{
							width: '810px',
							height: 'auto',
						  }}
						width={810}
						height={540}
						alt={posts[0].title}
						priority={true}
					/>
				</Link>
			</div>
			<div className={highlights.htow}>
				{posts.map((post, index) => {
					if (index === 0) {
						return
					}

					return (
						<Link
							href={`${post.category}/${post.slug}`}
							className={highlights.htowc}
							key={post.slug}>
							<div className={highlights.content}>
								<span
									className={highlights.category}
									data-category={post.category}>
									{post.categorytitle}
								</span>
								<h3>{post.title}</h3>
							</div>
							<Image
								src={`posts/${post.image}`}
								width={810}
								height={540}
								alt={post.title}
							/>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
