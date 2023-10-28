'use client'

import dynamic from 'next/dynamic'
import type ReactQuill from 'react-quill'
const QuillWrapper = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill')
		// eslint-disable-next-line react/display-name
		return ({ ...props }) => <RQ {...props} />
	},
	{
		ssr: false
	}
) as typeof ReactQuill
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { BlogCategoriesType } from '@/app/types/blogCategories'
import FormPsx from '@/app/components/FormPsx'
import IconPicture from '@/app/components/icons/IconPicture'
import styles from '@/app/styles/admin.module.css'
import styleForm from '@/app/styles/form.module.css'

export default function FormEditPost({
	categories
}: {
	categories: BlogCategoriesType[]
}) {
	const formRef = useRef<any>(null)
	const inputSlugRef = useRef<any>(null)
	const textAreaCodeRef = useRef<any>(null)
	const [config, setConfig] = useState({
		editorContent: '',
		categorySlug: '',
		isHtmlCode: false,
		selectedImage: '',
		loading: false
	})
	const quillConfig = {
		modules: {
			toolbar: [
				[{ header: [2, 3, false] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' }
				],
				['link' /* , 'image','video' */]
			]
		},
		formats: [
			'header',
			'bold',
			'italic',
			'underline',
			'strike',
			'blockquote',
			'list',
			'bullet',
			'indent',
			'link',
			'image',
			'video'
		]
	}

	const setHtmlCodeToEditor = () => {
		setTimeout(() => {
			textAreaCodeRef.current.focus()
		}, 200)

		setConfig((prevState) => {
			return {
				...prevState,
				editorContent: textAreaCodeRef.current.value,
				isHtmlCode: !prevState.isHtmlCode
			}
		})
	}

	const setContentEditor = (content: string) => {
		if (content === '<p><br></p>') {
			textAreaCodeRef.current.value = ''
			setConfig((prevState) => {
				return {
					...prevState,
					editorContent: ''
				}
			})
			return
		}
		setConfig((prevState) => {
			return {
				...prevState,
				editorContent: content
			}
		})
		textAreaCodeRef.current.value = content
	}

	const setSlug = (inputSlugValue: string) => {
		const formattedSlug = inputSlugValue
			.trim()
			.toLocaleLowerCase()
			.normalize('NFD')
			.replace(/[^a-zA-Z0-9 -]/g, '')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/ /g, '-')

		inputSlugRef.current.value = formattedSlug
		setConfig((prevState) => {
			return {
				...prevState,
				categorySlug: formattedSlug
			}
		})
	}

	const sendForm = (formHandle: any) => {
		const image = document.querySelector(
			'[name="images[]"]'
		) as HTMLInputElement

		setConfig((prevState) => ({
			...prevState,
			loading: true
		}))

		const formContents = {
			...formHandle.values
		}
		const formData = new FormData()

		if (image?.files?.length) {
			for (let ind = 0, len = image?.files?.length; ind < len; ind++) {
				formData.append(`files[]`, image?.files?.[ind])
			}
		}

		for (const key in formContents) {
			if (formContents[key] !== null) {
				if (key === 'files[]') {
					continue
				}
				formData.append(`${key}`, `${formContents[key]}`)
			}
		}

		fetch('/api/posts/add', {
			method: 'post',
			body: formData
		})
			.then((res) => res.json())
			.then(async (data) => {
				if (data.code === '1') {
					formRef.current.reset()
				}
				setConfig((prevState) => ({
					...prevState,
					editorContent: '',
					selectedImage: '',
					loading: false
				}))
			})
	}

	const onSelectImage = (evt: any) => {
		if (!evt.target.files.length) return

		setConfig((prevState) => {
			return {
				...prevState,
				selectedImage: URL.createObjectURL(evt.target.files[0])
			}
		})
	}

	return (
		<>
			<FormPsx
				ref={formRef}
				className={styleForm.form}
				onSubmit={sendForm}
				data-disabled={config.loading}
				autoComplete="off">
				<fieldset>
					<label>Título</label>
					<div>
						<input
							name="title"
							type="text"
							required
							onChange={(evt) => {
								setSlug(evt.target.value)
							}}></input>
					</div>
				</fieldset>
				<fieldset>
					<label>
						Slug <small>(url do post)</small>
					</label>
					<div>
						<input
							name="slug"
							type="text"
							required
							ref={inputSlugRef}></input>
					</div>
				</fieldset>
				<fieldset>
					<label>Categoria</label>
					<div>
						<select name="category" defaultValue={'0'}>
							<option value={0} disabled>
								-- Selecione --
							</option>
							{categories.map((category) => (
								<option value={category.slug} key={category.id}>
									{category.title}
								</option>
							))}
						</select>
					</div>
				</fieldset>
				<fieldset>
					<label>Visibilidade</label>
					<div>
						<select name="visible" defaultValue={1}>
							<option value="0">Ocultar</option>
							<option value="1">Mostrar</option>
						</select>
					</div>
				</fieldset>
				<fieldset>
					<span>
						Imagem <small>(810x540)</small>
					</span>
					<div>
						<label className={styles.inputImage}>
							<input
								name="images[]"
								type="file"
								accept="image/*,capture=camera"
								onChange={onSelectImage}
							/>
							{config.selectedImage !== '' ? (
								<Image
									src={config.selectedImage}
									alt="Post image"
									fill={true}
								/>
							) : (
								<IconPicture className="icon-svg" />
							)}
						</label>
					</div>
				</fieldset>
				<fieldset>
					<label>Descrição</label>
					<textarea name="description" rows={3}></textarea>
				</fieldset>
				<fieldset>
					<label>Conteúdo</label>
					<div
						className={styleForm.editor + ' ' + styles.stylesEditor}
						data-show-code={config.isHtmlCode}>
						<QuillWrapper
							theme="snow"
							modules={quillConfig.modules}
							formats={quillConfig.formats}
							value={config.editorContent}
							onChange={setContentEditor}
						/>
						<textarea
							name="content"
							className={styleForm.editorCode}
							ref={textAreaCodeRef}></textarea>
						<span
							className={styleForm.editorSwitch}
							onClick={setHtmlCodeToEditor}>
							Html
						</span>
					</div>
				</fieldset>
				<fieldset>
					<label>&nbsp;</label>
					<div>
						<button className="buttonPrimary" type="submit">
							{config.loading ? 'Aguarde...' : 'Publicar'}
						</button>
					</div>
				</fieldset>
			</FormPsx>
			<StylesReactQuill />
		</>
	)
}

function StylesReactQuill() {
	return (
		<style global jsx>{`
			@import url('/css/react-quill.css');
		`}</style>
	)
}
