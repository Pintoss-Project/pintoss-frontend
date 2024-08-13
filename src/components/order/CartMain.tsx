'use client';

import { getUserInfo } from '@/app/api/user/getUserInfo';
import { UserInfo } from '@/models/user';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	});

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox setTotalAmount={setTotalAmount} userId={userInfo?.data?.id as number} />
			<Spacing margin="54px" />
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox userInfo={userInfo?.data as UserInfo} />
				<CartPaymentInfoBox totalAmount={totalAmount} userId={userInfo?.data.id as number} />
			</div>
		</div>
	);
};

export default CartMain;
