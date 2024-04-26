/**
 * External dependencies
 */
import { SessionProvider } from 'next-auth/react';
import { Unauthorized } from '../components';
import Head from 'next/head';

/**
 * Internal dependencies
 */
import '../styles/globals.css';
import '../styles/main.scss';
import { StoreProvider, FavoriteProvider } from '../utils';
import OrderProvider from '../utils/Order';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="E-Commerce App. Project of Numo Francis, an expert Frontend Developer in crafting software solutions that address unique challenges and measurably impact the bottom line."
				/>
				<meta
					name="keywords"
					content="Frontend Developer, Mobile Developer, Open Source, Freelance Web Developer, Freelance Mobile Developer, Javascript Developer, Developer Portfolio, React Developer, Web Developer, React Frontend Developer"
				/>

				<meta property="og:title" content="Eleganté Shop" />
				<meta
					property="og:description"
					content="E-Commerce App. Project of Numo Francis, an expert Frontend Developer in crafting software solutions that address unique challenges and measurably impact the bottom line."
				/>
				<meta property="og:image" content="/images/ogelegante.png" />
				<meta property="og:image:width" content="1600" />
				<meta property="og:image:height" content="237" />

				<meta property="og:image:alt" content="Eleganté Shop" />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="og:url" content="https://elegante-shop.vercel.app/" />
				<meta name="twitter:card" content="summary" />
				<meta name="theme-color" content="#000000" />
				<meta name="robots" content="index, follow" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>

				<title>eleganté</title>
			</Head>

			<SessionProvider session={session}>
				<OrderProvider>
					<StoreProvider>
						<FavoriteProvider>
							{Component.auth ? (
								<Unauthorized>
									<Component {...pageProps} />
								</Unauthorized>
							) : (
								<Component {...pageProps} />
							)}
						</FavoriteProvider>
					</StoreProvider>
				</OrderProvider>
			</SessionProvider>
		</>
	);
}
