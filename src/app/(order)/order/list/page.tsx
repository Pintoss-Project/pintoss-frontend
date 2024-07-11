import OrderMain from '@/components/order/OrderMain';
import * as s from '@/components/order/OrderStyle.css';

import PageSection from '@/components/PageSection';
import { Flex } from '@/shared/components/layout';

const OrderList = () => {
	return (
		<Flex justify="center" className={s.container}>
			<PageSection header="주문내역" main={<OrderMain />} />
		</Flex>
	);
};

export default OrderList;
