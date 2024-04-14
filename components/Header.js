/**
 * External dependencies
 */
import Link from 'next/link';
import { SlLogin } from 'react-icons/sl';
import { RiMenu3Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import Button from './Button';

export default () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<>
			<header className="max-w-container">
				<div className={`header ${toggleMenu ? 'is-sticky' : ''}`}>
					<Link href="/" className="elegante">
						eleganté
					</Link>

					<NavLinks />

					<Button
						className="toggle-menu"
						onClick={() => setToggleMenu((prev) => !prev)}
					>
						{toggleMenu ? (
							<AiOutlineClose size={35} />
						) : (
							<RiMenu3Line size={35} />
						)}
					</Button>
				</div>
			</header>

			{toggleMenu && (
				<div className="mobile-links">
					<NavLinks />
				</div>
			)}
		</>
	);
};

export function NavLinks() {
	return (
		<div className="links">
			<Link href="">Shop</Link>

			<Link href="">Favorites</Link>

			<Link href="">
				<SlLogin size={24} />
				<span>Login</span>
			</Link>

			<Link href="">
				<span>Basket</span>
				<span className="count">
					<span>0</span>
				</span>
			</Link>
		</div>
	);
}
