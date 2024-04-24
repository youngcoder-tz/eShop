/**
 * External dependencies
 */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ProfileMenu({ logoutClickHandler, name }) {
	const [dropdownMenu, setDropdownMenu] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setDropdownMenu(false);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	const list = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.3,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
	};

	const item = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 100 },
	};

	return (
		<div
			className="account-nav-link"
			ref={wrapperRef}
			onMouseEnter={() => setDropdownMenu(true)}
			onMouseLeave={() => setDropdownMenu(false)}
		>
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				MY ACCOUNT
			</a>

			<div className={`account-dropdown ${dropdownMenu ? 'is-active' : ''}`}>
				<Link className="dropdown-link" href={'/order-history'}>
					Order History
				</Link>

				<Link className="dropdown-link" href={'#'} onClick={logoutClickHandler}>
					Logout
				</Link>
			</div>
		</div>
	);
}
