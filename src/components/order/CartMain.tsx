'use client';

import * as s from './CartStyle.css';
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
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox />
				<CartPaymentInfoBox totalAmount={totalAmount} />
			</div>
		</div>
	);
};

export default CartMain;
