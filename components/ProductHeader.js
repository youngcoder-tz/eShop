/**
 * External dependencies
 */
import Link from 'next/link';
import { SlArrowRight } from 'react-icons/sl';

export default ({ title, children }) => {
	return (
		<header className="page-title-section">
			<h1>{title}</h1>

			<div className="breadcrumbs">
				<Link href={'/'}>Home</Link>

				<SlArrowRight className="arrow" />

				<Link href={'/shop'}>Products</Link>

				{children}
			</div>
		</header>
	);
};
