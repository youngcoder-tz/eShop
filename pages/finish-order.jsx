/**
 * External dependencies
 */
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import axios from 'axios';

/**
 * Internal dependencies
 */
import { Layout, ProductHeader, AddCoupon } from '../components';
import { Store } from '../utils';

export default function FinishOrder() {
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);

	const { shippingAddress, cartItems, paymentMethod } = cart;
	const paymentOptions = ['PayPal', 'Cash On Delivery'];

	const handleAddress = (payload) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: { ...shippingAddress, ...payload },
		});
	};

	// Price Calculations
	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
	const itemsPrice = round2(
		cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	);
	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = round2(itemsPrice * 0.15);
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);

			const { data } = await axios.post('/api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			});

			dispatch({ type: 'CART_CLEAR_ITEMS' });
			push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			console.log(err);
			toast.error('Something went wrong. Please try again.');
		}
	};

	return (
		<Layout title={'FINISH ORDER'}>
			<ProductHeader
				title={'Confirm Order'}
				links={[
					{ name: 'Home', href: '/' },
					{ name: 'Confirm Order', href: '/finish-order' },
				]}
			/>

			<AddCoupon />

			<div className="gap-10 lg:grid lg:grid-cols-2 finish-order">
				<section>
					<h3>Billing details</h3>

					<form className="auth-form !mt-0">
						{/* Full Name */}
						<label htmlFor="fullName">
							Name
							<span className="required">*</span>
						</label>
						<input
							required
							type="text"
							id="fullName"
							value={shippingAddress?.fullName}
							className="contained-input"
							onChange={(e) => handleAddress({ fullName: e.target.value })}
						/>

						{/* Address */}
						<label htmlFor="address">
							Address
							<span className="required">*</span>
						</label>
						<input
							required
							type="text"
							id="address"
							className="contained-input"
							value={shippingAddress?.address}
							onChange={(e) => handleAddress({ address: e.target.value })}
						/>

						{/* Postal Code */}
						<label htmlFor="postalCode">
							Postal Code
							<span className="required">*</span>
						</label>
						<input
							required
							type="text"
							id="postalCode"
							className="contained-input"
							value={shippingAddress?.postalCode}
							onChange={(e) => handleAddress({ postalCode: e.target.value })}
						/>

						{/* Phone */}
						<label htmlFor="phone">
							Phone
							<span className="required">*</span>
						</label>
						<input
							required
							type="number"
							id="phone"
							className="contained-input"
							value={shippingAddress?.phone}
							onChange={(e) => handleAddress({ phone: e.target.value })}
						/>
					</form>
				</section>

				<section className="your-order">
					<h3>Your order</h3>

					<table>
						<thead>
							<tr>
								<th className="product-name right-side">Product</th>
								<th className="product-total left-side">Subtotal</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => (
								<tr className="cart-item" key={item.slug}>
									<td className="product-thumbnail right-side">
										<Link
											href={`/product/${item.slug}`}
											className="flex items-center link-blue"
										>
											<Image
												src={item.image}
												alt={item.name}
												width={40}
												height={40}
												className="h-auto w-auto mr-5"
											/>
											&nbsp;
											{item.name}
										</Link>
									</td>
									<td className="product-total text-right">
										${item.quantity * item.price}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="cart-subtotal">
								<th className="right-side">Subtotal</th>
								<td className="text-right !pr-[1.9em]">${totalPrice}</td>
							</tr>
							<tr className="cart-total">
								<th className="right-side">Total</th>
								<td className="left-side !text-xl !pr-[1.0625em]">
									${totalPrice}
								</td>
							</tr>
						</tfoot>
					</table>

					<div className="payment">
						<form>
							{paymentOptions.map((payment) => (
								<div key={payment} className="p-2 flex items-center">
									<input
										type="radio"
										name="paymentMethod"
										checked={paymentMethod === payment}
										onChange={() => {
											dispatch({
												type: 'SAVE_PAYMENT_METHOD',
												payload: payment,
											});
										}}
										value={paymentMethod}
										id={payment}
										className="outline-none focus:ring-0 w-5 h-5"
									/>
									<label htmlFor={payment} className="px-2 font-medium">
										{payment}
									</label>
								</div>
							))}
						</form>

						<div>
							<button
								onClick={placeOrderHandler}
								type="submit"
								className="secondary-btn w-full"
							>
								{loading ? (
									<ReactLoading
										type="spin"
										color="#333"
										height={25}
										width={25}
									/>
								) : (
									<>PLACE ORDER</>
								)}
							</button>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
}

FinishOrder.auth = true;
