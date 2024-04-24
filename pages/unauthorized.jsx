/**
 * External dependencies
 */
import { useRouter } from 'next/router';

/**
 * Internal dependencies
 */
import { Layout } from '../components';

export default function Unauthorized() {
	const {
		query: { message },
	} = useRouter();
	return (
		<Layout title={'ACCESS DENIED'}>
			<div className="text-center h-[50vh] flex flex-col items-center justify-center">
				<h1 className="text-lg md:text-xl font-bold uppercase">
					Access Denied
				</h1>

				{message && (
					<h1 className=" text-red-500 font-bold uppercase text-lg md:text-xl">
						{message}
					</h1>
				)}
			</div>
		</Layout>
	);
}
