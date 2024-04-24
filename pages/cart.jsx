/**
 * External dependencies
 */
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TbShoppingCartX } from 'react-icons/tb';

/**
 * Internal dependencies
 */
import { Store } from '../utils';
import { ProductHeader, Select, AddCoupon, Layout } from '../components';

function CartScreen() {
	const { push } = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

	const handleRemoveCartItem = (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	const handleUpdateCart = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);

		if (data.countInStock < quantity) {
			return toast.error(`Sorry! ${item.name} is out of Stock`);
		}

		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
		toast.success('Cart Updated Successfully');
	};

	if (cartItems.length === 0) {
		return (
			<Layout title={'CART'}>
				<ProductHeader
					title={'CART'}
					links={[{ name: 'Home', href: '/' }, { name: 'Cart' }]}
				/>
				<div className="">
					<h1 className="flex items-center text-xl uppercase font-bold mb-3">
						Your cart is empty
					</h1>
					<div>
						<Link
							href={'/shop'}
							className="link-blue underline underline-offset-8 mb-5"
						>
							Go Shopping
						</Link>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<>
			<Layout title={'CART'}>
				<ProductHeader
					title={'CART'}
					links={[{ name: 'Home', href: '/' }, { name: 'Cart' }]}
				/>

				<div className="cart-container">
					<section className="bag">
						<h1>Shopping Bag</h1>

						<table className="min-w-full mb-10">
							<thead className="border uppercase">
								<tr className="text-center ">
									<th className="px-5 text-left  py-5">Item</th>
									<th>Quantity</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item) => (
									<tr
										key={item.slug}
										className="text-center border text-sm md:text-lg"
									>
										<td className="text-left">
											<div className="flex items-center p-5">
												<button
													type="button"
													onClick={() => handleRemoveCartItem(item)}
													className="text-gray-500 hover:text-red-600 md:mr-0"
												>
													<AiOutlineClose className="h-5 w-5"></AiOutlineClose>
												</button>

												<Link
													href={`/product/${item.slug}`}
													className="flex items-center p-5 text-[#1bb0ce] hover:text-[#1691aa] font-semibold"
												>
													<Image
														src={item.image}
														alt={item.name}
														width={150}
														height={150}
														className="px-5 hidden sm:inline-flex"
													/>

													{item.name}
												</Link>
											</div>
										</td>
										<td>
											<Select
												value={item.quantity}
												onChange={(newValue) =>
													handleUpdateCart(item, newValue)
												}
												options={[...Array(item.countInStock).keys()].map(
													(num) => ({
														name: num + 1,
														value: num + 1,
													})
												)}
											/>
										</td>
										<td className="p-5 md:p-5 font-semibold">
											${item.priceDisplay}
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<AddCoupon />
					</section>

					<section className="totals">
						<h1>Cart Totals</h1>

						<div className="border border-b-0 border-[#ddd] p-5 flex items-center justify-between">
							<h1 className="subtotal">Subtotal</h1>

							<h3 className="font-semibold md:text-xl">${totalPrice}</h3>
						</div>

						<div className="border border-[#ddd] border-t-[#888] p-5 space-y-5">
							<div className="flex items-center justify-between">
								<h1 className="uppercase font-semibold">Total</h1>
								<h3 className="font-bold sm:text-2xl">${totalPrice}</h3>
							</div>

							<button
								onClick={() => push('/login?redirect=/finish-order')}
								className="primary-btn w-full"
							>
								PROCEED TO CHECKOUT
							</button>
						</div>
					</section>
				</div>
			</Layout>
		</>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
