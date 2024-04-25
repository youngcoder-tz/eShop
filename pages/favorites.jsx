/**
 * External dependencies
 */
import { useContext } from 'react';

/**
 * Internal dependencies
 */
import { Layout, ProductHeader, ProductsList } from '../components';
import { Favorites } from '../utils';
import Link from 'next/link';

export default () => {
	const {
		state: { favorites },
		dispatch: dispatchFavorites,
	} = useContext(Favorites);

	return (
		<Layout title={'FAVORITES'}>
			<ProductHeader
				title={'Favorites'}
				links={[{ name: 'Home', href: '/' }, { name: 'Favorites' }]}
			/>

			{favorites.length > 0 ? (
				<>
					<ProductsList products={favorites} />
				</>
			) : (
				<>
					<h1 className="uppercase font-medium text-2xl mb-2">
						You don't have any favorites.
					</h1>

					<p className="text-gray-400">
						Like some products from our{' '}
						<Link
							href={'/shop'}
							className="link-blue underline-offset-4 underline"
						>
							Shop
						</Link>{' '}
						.
					</p>
				</>
			)}
		</Layout>
	);
};
