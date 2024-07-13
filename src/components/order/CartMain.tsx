'use client';

import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';

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
