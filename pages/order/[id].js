/**
 * External dependencies
 */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

/**
 * Internal dependencies
 */
import axios from 'axios';
import { errorHandler, Order } from '../../utils';
import { Layout, ProductHeader } from '../../components';

function OrderScreen({ orderId }) {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const { state, dispatch } = useContext(Order);

	const { loading, error, order, successPay, loadingPay } = state;

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`);
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: errorHandler(err) });
			}
		};
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: 'PAY_REQUEST' });
			}
		} else {
			// PAYPAL HANDLER
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get('/api/keys/paypal');
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
				loadPaypalScript();
			};
		}
	}, [orderId, order, paypalDispatch, successPay]);

	const { orderItems, totalPrice, isPaid } = order;

	// PAYPAL ACTIONS
	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: totalPrice },
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async (details) => {
			try {
				dispatch({ type: 'PAY_REQUEST' });
				const {} = await axios.post(`/api/orders/${order._id}/pay`, details);
				toast.success('Order is paid successfully');
			} catch (err) {
				dispatch({ type: 'PAY_FAIL', payload: errorHandler(err) });
				toast.error(errorHandler(err));
			}
		});
	};

	const onError = (err) => {
		toast.error(errorHandler(err));
	};

	if (error) {
		toast.error(error);
	}

	return (
		<Layout title={'CHECKOUT'}>
			<ProductHeader
				title={'Checkout'}
				links={[{ name: 'Home', href: '/' }, { name: 'Checkout' }]}
			/>

			{loading ? (
				<>
					<div className="flex flex-col h-[20vh] items-center justify-center">
						<ReactLoading type="spin" color="#333" height={100} width={50} />
					</div>
				</>
			) : (
				<main className="gap-20 checkout-container">
					<div className="checkout-title mb-8 flex-shrink-0 flex-grow-0">
						<h1>
							<span className="text-xl text-gray-500">Pay this amount:</span>
							<span className="block total">$ {totalPrice}.00</span>
						</h1>
						{!isPaid && (
							<div className="flex justify-center mt-5 max-w-[350px]">
								{isPending ? (
									<div>
										<ReactLoading
											type="spin"
											color="#333"
											height={100}
											width={50}
										/>
									</div>
								) : (
									<div className="w-full">
										<PayPalButtons
											createOrder={createOrder}
											onApprove={onApprove}
											onError={onError}
										></PayPalButtons>
									</div>
								)}
								{loadingPay && (
									<div>
										<ReactLoading
											type="spin"
											color="#333"
											height={100}
											width={50}
										/>
									</div>
								)}
							</div>
						)}
					</div>

					<table className="mb-10 checkout-table w-full">
						<thead className="border uppercase">
							<tr className="text-center ">
								<th className="px-5 text-left  py-5">Item</th>
								<th>Price ($)</th>
								<th>Subtotal ($)</th>
							</tr>
						</thead>
						<tbody>
							{orderItems?.map((item) => (
								<tr
									key={item.slug}
									className="text-center border text-sm md:text-lg"
								>
									<td className="text-left">
										<Link
											href={`/product/${item.slug}`}
											className="flex items-center py-5 pl-5 text-[#1bb0ce] hover:text-[#1691aa] font-semibold"
										>
											<Image
												src={item.image}
												alt={item.name}
												width={150}
												height={150}
												className="hidden pr-5 sm:inline-flex"
											/>

											<p>
												{item.name}
												<span className="block text-gray-400 text-sm">
													Qty: {item.quantity}
												</span>
											</p>
										</Link>
									</td>
									<td className="px-10">{item.price}</td>
									<td className="p-5 md:p-5 font-semibold">
										{item.price * item.quantity}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>
			)}
		</Layout>
	);
}

export default () => {
	const { query } = useRouter();
	const orderId = query.id;

	return (
		<PayPalScriptProvider options={process.env.PAYPAL_CLIENT_ID}>
			<OrderScreen orderId={orderId} />
		</PayPalScriptProvider>
	);
};

OrderScreen.auth = true;
