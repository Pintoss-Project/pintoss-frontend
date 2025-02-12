import * as s from '@/components/order/CartStyle.css';

import CartMain from '@/components/order/CartMain';
import PageSection from '@/components/PageSection';
import { Flex } from '@/shared/components/layout';
import ProtectedRoute from '@/components/protect/ProtectedRoute';

const Cart = () => {
	return (
		<ProtectedRoute>
			<Flex className={s.container}>
				<PageSection header="장바구니" main={<CartMain />} />
			</Flex>
		</ProtectedRoute>
	);
};

export default Cart;
