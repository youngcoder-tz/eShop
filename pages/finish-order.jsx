import { Layout } from '../components';
import { OrderSummary } from '../components/OrderSummary';

export default function FinishOrder() {
	return (
		<Layout title={'FINISH ORDER'}>
			<OrderSummary />
		</Layout>
	);
}

FinishOrder.auth = true;
