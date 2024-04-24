/**
 * External dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import { Layout, ProductHeader } from '../components';

export default function PageNotFound() {
	return (
		<Layout title={'NOT FOUND'}>
			<ProductHeader title={'Page not found'} />

			<div className="not-found">
				<h1 className="">404 | This page could not be found.</h1>

				<Link href={'/shop'} className="link-blue underline underline-offset-8">
					Continue Shopping
				</Link>
			</div>
		</Layout>
	);
}
