/**
 * External dependencies
 */
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import ReactLoading from 'react-loading';

/**
 * Internal dependencies
 */
import { Layout } from '../components';
import { errorHandler, displayError } from '../utils';

export default function LoginScreen() {
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const { push, query } = useRouter();
	const { redirect } = query;

	useEffect(() => {
		if (session?.user) {
			push(redirect || '/');
		}
	}, [session, redirect]);

	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm();

	const submitHandler = async ({ name, email, password }) => {
		try {
			setLoading(true);
			await axios.post('/api/auth/signup', {
				name,
				email,
				password,
			});
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			setLoading(false);
			if (result.error) {
				setLoading(false);
				toast.error(result.error);
			}
		} catch (err) {
			setLoading(false);
			toast.error(errorHandler(err));
		}
	};

	return (
		<Layout title={'SIGN UP'}>
			<h2 className="auth-title">Create Account</h2>

			<form className="auth-form" onSubmit={handleSubmit(submitHandler)}>
				{/* Name */}
				<label htmlFor="name">
					Name
					<span className="required">*</span>
				</label>
				<input
					{...register('name', {
						required: 'Please enter your name.',
					})}
					type="text"
					id="name"
					className="contained-input"
				/>
				{errors.name && displayError(errors.name.message)}

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
				/>
				{errors.email && displayError(errors.email.message)}

				{/* Password */}
				<label htmlFor="password">
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
				/>
				{errors.password && displayError(errors.password.message)}

				{/* Confirm Password */}
				<label htmlFor="confirmPassword">
					Confirm Password
					<span className="required">*</span>
				</label>
				<input
					{...register('confirmPassword', {
						required: 'Please confirm your password',
						validate: (value) => value === getValues('password'),
						minLength: {
							value: 6,
							message: 'password must be at least 6 characters',
						},
					})}
					type="password"
					id="confirmPassword"
					className="contained-input"
				/>
				{errors.confirmPassword && displayError(errors.confirmPassword.message)}

				<p className="mt-10 gap-7 flex flex-wrap items-center">
					<button className="secondary-btn">
						{loading ? (
							<ReactLoading type="spin" color="#333" height={25} width={25} />
						) : (
							<>Regsiter</>
						)}
					</button>

					<span>
						Already have an account?{' '}
						<Link
							href={`/login?redirect=${redirect || '/shop'}`}
							className="text-[#1bb0ce] hover:text-[#1691aa]"
						>
							Login
						</Link>
					</span>
				</p>
			</form>
		</Layout>
	);
}
