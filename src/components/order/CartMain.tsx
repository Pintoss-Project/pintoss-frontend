'use client';

import { getUserInfo } from '@/app/api/user/getUserInfo';
import { UserInfo } from '@/models/user';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';
import { updateCartPayMethodAndPrice } from '@/app/api/cart/updateCart';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedType, setSelectedType] = useState<string>('card');

	const queryClient = useQueryClient();

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	});

	useEffect(() => {
		if (userInfo?.data?.id) {
			updateCartPayMethodAndPrice(userInfo.data.id, selectedType.toUpperCase()).then(() => {
				queryClient.invalidateQueries({ queryKey: ['cartItems'] });
			});
		}
	}, [selectedType, userInfo, queryClient]);

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox
				setTotalAmount={setTotalAmount}
				userId={userInfo?.data?.id as number}
				selectedType={selectedType}
			/>
			<Spacing margin="54px" />
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox userInfo={userInfo?.data as UserInfo} />
				<CartPaymentInfoBox
					totalAmount={totalAmount}
					userId={userInfo?.data.id as number}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
				/>
			</div>
		</div>
	);
};

export default CartMain;
