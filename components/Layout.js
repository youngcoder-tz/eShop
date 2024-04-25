/**
 * External dependencies
 */
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

/**
 * Internal dependencies
 */
import Header from './Header';
import Footer from './Footer';

export default ({ children, title }) => {
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate');
				} else {
					entry.target.classList.remove('animate');
				}
			});
		});

		const animatableElements = document.querySelectorAll('.will-animate');
		animatableElements.forEach((el) => observer.observe(el));
	});

	return (
		<>
			<Head>
				<title>{title ? title + ' - eleganté' : 'eleganté'}</title>
			</Head>

			<ToastContainer
				position="top-left"
				limit={3}
				autoClose={3000}
				pauseOnFocusLoss={false}
				theme={'light'}
			/>

			<Header />

			<main
				className={`max-w-container min-h-[60vh] ${
					!['SHOP', 'HOME'].includes(title) ? 'will-animate main' : ''
				}`}
			>
				{children}
			</main>

			<Footer />
		</>
	);
};
