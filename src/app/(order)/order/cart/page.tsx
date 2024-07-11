import * as s from '@/components/order/CartStyle.css';

import CartMain from '@/components/order/CartMain';
import PageSection from '@/components/PageSection';
import { Flex } from '@/shared/components/layout';

const Cart = () => {
	return (
		<Flex className={s.container}>
			<PageSection header="장바구니" main={<CartMain />} />
		</Flex>
	);
};

export default Cart;
