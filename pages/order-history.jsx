/**
 * External dependencies
 */
import Link from 'next/link';
import { useContext } from 'react';
import Image from 'next/image';

/**
 * Internal dependencies
 */
import { Layout } from '../components';
import { Order } from '../utils';

function OrderHistory() {
	const {
		state: { order },
	} = useContext(Order);

	return (
		<Layout title={'ORDER HISTORY'}>
			<h2 className="auth-title mb-10">Order History</h2>

			{order ? (
				<div className="overflow-x-auto mb-14">
					<table className=" border-[#bbb] border text-sm md:text-md">
						<thead>
							<tr className=" text-left border-[#bbb] border-b">
								<th className="p-5">ITEM</th>
							</tr>
						</thead>

						<tbody>
							{order.orderItems?.map((item, i) => (
								<tr
									className={`${
										i < order.orderItems.length - 1
											? 'border-[#888] border-b'
											: ''
									}`}
									key={item._id}
								>
									<td className="p-5 flex flex-col md:flex-row items-center gap-5 text-left">
										<Image
											src={item.image}
											alt={item.name}
											width={80}
											height={80}
										/>
										<div>
											{item.name}
											<p>Date: {order.createdAt.substring(0, 10)}</p>
											<p>
												{order.isPaid ? (
													`${order.paidAt.substring(0, 10)}`
												) : (
													<p className="">NOT PAID</p>
												)}
											</p>
											<p>
												{order.isDelivered ? (
													`${order.deliveredAt.substring(0, 10)}`
												) : (
													<p className="">NOT DELIVERED</p>
												)}
											</p>
											<p>
												<Link
													href={`/order/${order._id}`}
													className="link-blue"
												>
													Go to order
												</Link>
											</p>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="text-left">
					<h1 className="font-bold mb-4">
						Oh, you haven't made any orders yet.
					</h1>
					<Link
						href={'/shop'}
						className="link-blue underline underline-offset-8"
					>
						<span>Go Shopping</span>
					</Link>
				</div>
			)}
		</Layout>
	);
}

OrderHistory.auth = true;
export default OrderHistory;
