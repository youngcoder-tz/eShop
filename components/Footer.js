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
import Subscribe from './Subscribe';

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
				<Subscribe />
				<div className="main">
					<div className="info">
						<h1 className="elegante">jom-product05</h1>
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
							<p>+255 738 370 786</p>
							<p>jomirish0@gmail.com</p>
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
								<Link href="/favorites">Favorites</Link>
							</p>
						</div>
					</div>
				</div>

				<div className="floor">
					<p>© 2024 Jom Irish.</p>

					<span className="social-links">
						<Link target='_blank' href="https://github.com/">
							<FaGithub />
						</Link>
						<Link target='_blank' href="https://linkedin.com/in/">
							<FaLinkedin />
						</Link>
						<Link target='_blank' href="/">
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
