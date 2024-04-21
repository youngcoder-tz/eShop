/**
 * External dependencies
 */
import { useState } from 'react';

export default () => {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="">
			<p>
				Have a coupon?{' '}
				<button
					className="text-[#1bb0ce]"
					onClick={() => setShowForm((prev) => !prev)}
				>
					Click here to enter your code
				</button>
			</p>

			<div
				className={`coupon-form space-y-5 my-5 ${showForm ? 'is-active' : ''}`}
			>
				<p>If you have a coupon code, please apply it below.</p>
				<input
					type="text"
					placeholder="Coupon code"
					className="contained-input"
				/>
				<br />
				<button className="secondary-btn">Apply Coupon</button>
			</div>
		</div>
	);
};
