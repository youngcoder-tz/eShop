/**
 * External dependencies
 */
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactLoading from 'react-loading';

/**
 * Internal dependencies
 */
import { Layout } from '../components';
import { displayError } from '../utils';

export default function LoginScreen() {
	const [loading, setLoading] = useState(false);
	const { push, query } = useRouter();
	const { redirect } = query;

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		setLoading(true);
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});
		setLoading(false);
		if (result.error) {
			toast.error(result.error);
		} else {
			push(redirect ? redirect : '/shop');
		}
	};

	return (
		<Layout title={'LOGIN'}>
			<h2 className="auth-title">Login</h2>

			<form className="auth-form" onSubmit={handleSubmit(submitHandler)}>
				{/* Email */}
				<label htmlFor="email">
					Email
					<span className="required">*</span>
				</label>
				<input
					{...register('email', {
						required: 'Please enter email',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
							message: 'Invalid email format',
						},
					})}
					type="email"
					id="email"
					className="contained-input"
					defaultValue={'visitor@elegante.com'}
				/>
				{errors.email && displayError(errors.email.message)}

				{/* Password */}
				<label htmlFor="password" className="mt-5">
					Password
					<span className="required">*</span>
				</label>
				<input
					{...register('password', {
						required: 'Please enter password',
						minLength: {
							value: 6,
							message: 'password must be at least 6 characters',
						},
					})}
					type="password"
					id="password"
					className="contained-input"
					defaultValue={'123456'}
				/>
				{errors.password && displayError(errors.password.message)}

				<p className="mt-10 gap-7 flex flex-wrap items-center">
					<button className="secondary-btn">
						{loading ? (
							<ReactLoading type="spin" color="#333" height={25} width={25} />
						) : (
							<>Log in</>
						)}
					</button>

					<span>
						Don't have an account?{' '}
						<Link
							href={`/register?redirect=${redirect || '/shop'}`}
							className="text-[#1bb0ce] hover:text-[#1691aa]"
						>
							Register
						</Link>
					</span>
				</p>
			</form>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const { redirect } = ctx.query;
	const session = await getSession(ctx);

	if (redirect && session) {
		return {
			redirect: {
				destination: redirect,
			},
		};
	}

	return {
		props: {},
	};
}
