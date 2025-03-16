'use client';

import { fetchUserInfo } from '@/controllers/user/fetchUserInfo';
import { UserInfo } from '@/models/user';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import usePaymentScript from '../product/hooks/usePaymentScript';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedType, setSelectedType] = useState<string>('card');
	const router = useRouter();
	const { isAuthenticated, loading, user } = useAuth();

	const [orderItems, setOrderItems] = useState<any[]>([]);

	if (loading) return <Spinner />;

	if (!isAuthenticated || !user) {
		router.push('/');
		return null
	}

	usePaymentScript();

	useEffect(() => {
		console.log('orderItems', orderItems);
	}, [orderItems]);

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox
				setTotalAmount={setTotalAmount}
				userId={user.id as number}
				selectedType={selectedType}
				setOrderItems={setOrderItems}
			/>
			<Spacing margin="54px" />
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox userInfo={user} />
				<CartPaymentInfoBox
					totalAmount={totalAmount}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
					orderItems={orderItems}
				/>
			</div>
		</div>
	);
};

export default CartMain;
