/**
 * External dependencies
 */
import Image from 'next/image';

/**
 * Internal dependencies
 */
import { Button } from '.';
import { icons } from '../utils';

export default () => (
	<section className="subscribe will-animate">
		<div className="container">
			<div className="heading">
				<h3>Subscribe Now</h3>
				<h5>Enjoy 25% Discount</h5>

				<input
					type="text"
					placeholder="Your email address"
					className="outlined-input"
				/>
				<Button variant="link-button">
					SUBMIT
					{icons.arrowLight}
				</Button>
			</div>

			<div className="image-container">
				<span className="front">
					<Image
						src="/images/model-sub.png"
						alt="Model"
						width={867}
						height={786}
					/>
				</span>
			</div>
		</div>
	</section>
);
