/**
 * External dependencies
 */
import Link from 'next/link';
import { SlLogin } from 'react-icons/sl';
import { RiMenu3Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect, useContext } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

/**
 * Internal dependencies
 */
import Button from './Button';
import ProfileMenu from './ProfileMenu';
import { Store } from '../utils/Store';

export default () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<>
			<header className="max-w-container">
				<div className={`header ${toggleMenu ? 'is-sticky' : ''}`}>
					<Link href="/" className="elegante !text-[#D10D43]">
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
	const { data: session } = useSession();

	const [cartItemsCount, setCartItemsCount] = useState(0);
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		Cookies.remove('order');
		dispatch({ type: 'CART_REST' });
		signOut({ callbackUrl: '/' });
	};

	useEffect(() => {
		setCartItemsCount(cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cartItems]);

	return (
		<div className="links">
			<Link href="/shop">Shop</Link>

			<Link href="">Favorites</Link>

			{session?.user ? (
				<ProfileMenu
					name={session.user.name}
					logoutClickHandler={logoutClickHandler}
				/>
			) : (
				<Link href="/login">
					<SlLogin size={24} />
					<span>Login</span>
				</Link>
			)}

			<Link href="/cart">
				<span>Basket</span>
				<span className="count">
					<span>{cartItemsCount}</span>
				</span>
			</Link>
		</div>
	);
}
