/**
 * External dependencies
 */
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import { BsArrowUp } from 'react-icons/bs';
import { useState, useEffect } from 'react';

/**
 * Internal dependencies
 */
import Button from './Button';

export default () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop);
		return () => {
			window.removeEventListener('scroll', checkScrollTop);
		};
	}, [showScroll]);

	return (
		<>
			<footer className="max-w-container">
				<div className="main">
					<div className="info">
						<h1 className="elegante">eleganté</h1>
						<div>
							<p>
								There Are Many Variations Passages Of Lorem Ipsum Available, But
								The Majority Have Suffered Alteration In Some Form, By Injected
								Or Randomised .
							</p>
						</div>
					</div>
					<div className="contact">
						<h1>Contact</h1>
						<div>
							<p>+233 53 446 7527</p>
							<p>numofran6@gmail.com</p>
						</div>
					</div>
					<div className="quick-links">
						<h1>Quick Links</h1>

						<div>
							<p>
								<Link href="/">Home</Link>
							</p>

							<p>
								<Link href="/shop">Shop</Link>
							</p>

							<p>
								<Link href="#">Favorites</Link>
							</p>
						</div>
					</div>
				</div>

				<div className="floor">
					<p>© 2024 eleganté.</p>

					<span className="social-links">
						<Link href="">
							<FaGithub />
						</Link>
						<Link href="">
							<FaLinkedin />
						</Link>
						<Link href="">
							<GiWorld />
						</Link>
					</span>
				</div>
			</footer>

			<Button
				className="slide-up"
				onClick={scrollToTop}
				style={{ display: showScroll ? 'flex' : 'none' }}
			>
				<span className="overlay" />
				<BsArrowUp className="arrow-up" />
			</Button>
		</>
	);
};
