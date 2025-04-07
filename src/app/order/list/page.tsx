import OrderMain from '@/components/order/OrderMain';
import * as s from '@/components/order/OrderStyle.css';

import PageSection from '@/components/PageSection';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import { Flex } from '@/shared/components/layout';

const OrderList = () => {
	return (
		<ProtectedRoute>
			<Flex justify="center" className={s.container}>
				<PageSection header="주문내역" main={<OrderMain />} />
			</Flex>
		</ProtectedRoute>
	);
};

export default OrderList;
