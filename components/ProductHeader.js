/**
 * External dependencies
 */
import Link from 'next/link';
import { SlArrowRight } from 'react-icons/sl';

export default ({ title, links = [] }) => {
	return (
		<header className="page-title-section">
			<h1>{title}</h1>

			<div className="breadcrumbs">
				{links.map(({ href, name }, index) => (
					<>
						{href ? (
							<Link href={href}>{name}</Link>
						) : (
							<span className="text-[#D10D43]">{name}</span>
						)}
						{index < links.length - 1 && <SlArrowRight className="arrow" />}
					</>
				))}
			</div>
		</header>
	);
};
