'use client'

import { useRef, useState } from 'react'
/* import Link from 'next/link' */
import { useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'
import FormPsx from '@/app/components/FormPsx'
/* import { useNotification } from '../../../contexts/Notification'
import NotificationPsx from '../../../components/Notifications' */
/* import wait from '../../../helpers/wait' */
import styles from '@/app/styles/login.module.css'

declare global {
	interface Window {
		location: Location
	}
}

type Session = {
	user?: {
		id?: number
	}
}

export default function LoginForm() {
	const router = useRouter()
	const searchParams =
		typeof window !== 'undefined' ? window.location.search : ''
	const urlParams = new URLSearchParams(searchParams)
	const callbackUrl = urlParams.get('callbackUrl') || '/'
	const formRef = useRef<any>(null)
	const [loginFormOptions, setLoginFormOptions] = useState({
		loading: false
	})
	/* const { showNotification } = useNotification() */

	/* const notify = (
		content?: string,
		status?: '' | 'fail' | 'ok' | undefined
	) => {
		showNotification(content, status)
		setTimeout(() => {
			setLoginFormOptions((prevState) => ({
				...prevState,
				loading: false
			}))
			showNotification('', status)
		}, 4000)
	} */

	const sendForm = async (formHandle: any) => {
		const formContents = {
			...formHandle.values
		}

		setLoginFormOptions((prevState) => ({
			...prevState,
			loading: true
		}))

		try {
			const res = await signIn('credentials', {
				username: formContents.username,
				password: formContents.password,
				redirect: false
			})

			setLoginFormOptions((prevState) => ({
				...prevState,
				loading: false
			}))

			if (res?.error) {
				/* notify('Usuário ou Senha invalida!', 'fail') */
				return
			}

			const session = (await getSession()) as unknown as Session
			const ad = [1, 2, 3]

			if (ad.indexOf(session?.user?.id || 0) !== -1) {
				return router.replace('/admin')
			}

			/* notify('Bem-vindo(a)!', 'ok') */
			/* await wait(2000) */

			router.replace(callbackUrl)
		} catch (err) {
			/* notify('Ocorreu um erro!') */
			throw new Error('LOGIN: ' + err)
		}
	}

	return (
		<div className={styles.loginArea}>
			<FormPsx
				ref={formRef}
				className={styles.form}
				onSubmit={sendForm}
				autoComplete="off">
				<fieldset>
					<label>Email ou Nome de usuário</label>
					<div>
						<input
							name="username"
							type="text"
							required
							autoFocus
							title="Email ou Nome de usuário"
							disabled={loginFormOptions.loading}></input>
					</div>
				</fieldset>
				<fieldset>
					<label>Senha</label>
					<div>
						<input
							name="password"
							type="password"
							required
							title="Digite sua senha"
							disabled={loginFormOptions.loading}></input>
					</div>
				</fieldset>
				<fieldset>
					<div>
						<button
							className={`${styles.loginbtn} buttonPrimary`}
							type="submit"
							disabled={loginFormOptions.loading}>
							{loginFormOptions.loading ? 'Aguarde...' : 'Entrar'}
						</button>
					</div>
				</fieldset>
			</FormPsx>
			{/* <NotificationPsx /> */}
			{/* <div className={styles.account}>
				<Link href="/recuperar-conta">
					Esqueceu o seu usuário ou senha?
				</Link>
				<p>&nbsp;</p>
				<p>Não tem uma conta?</p>
				<Link className={styles.signup} href="/criar-conta">
					Crie uma conta
				</Link>
			</div> */}
		</div>
	)
}
