'use client';

import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/app/api/user/getUserInfo';
import { UserInfo } from '@/models/user';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	});

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox setTotalAmount={setTotalAmount} />
			<Spacing margin="54px" />
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox userInfo={userInfo?.data as UserInfo} />
				<CartPaymentInfoBox totalAmount={totalAmount} />
			</div>
		</div>
	);
};

export default CartMain;
