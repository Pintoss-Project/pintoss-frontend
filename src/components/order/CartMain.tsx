'use client';

import Spacing from '@/shared/components/layout/Spacing';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import { Flex } from '@/shared/components/layout';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import { useState } from 'react';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox setTotalAmount={setTotalAmount} />
			<Spacing margin="54px" />
			<Flex>
				<CartOrderEtcInfoBox />
				<CartPaymentInfoBox totalAmount={totalAmount} />
			</Flex>
		</div>
	);
};

export default CartMain;
