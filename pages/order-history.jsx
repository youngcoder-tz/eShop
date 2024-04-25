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

			{order.orderItems?.length > 0 ? (
				<div className="border-[#bbb] border flex flex-wrap">
					{order.orderItems?.map((item, i) => (
						<div
							className={`${
								i < order.orderItems.length - 1 ? 'border-[#888]' : ''
							} p-5 text-center flex-grow-0 flex-shrink-0`}
							key={item._id}
						>
							<p className="text-xl text-[#888]">{item.name}</p>
							<Image
								src={item.image}
								alt={item.name}
								width={300}
								height={300}
								className="my-5"
							/>
							<div className="text-left">
								<p className="mb-3 text-sm font-medium">
									Order Date: {order.createdAt.substring(0, 10)}
								</p>
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
								<p className="mt-5">
									<Link
										href={`/order/${order._id}`}
										className="link-blue underline-offset-8 underline"
									>
										Go to order
									</Link>
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-left">
					<h1 className="font-bold mb-4">
						Oops, you haven't made any orders yet.
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
