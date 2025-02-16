'use client';

import { fetchUserInfo } from '@/controllers/user/fetchUserInfo';
import { UserInfo } from '@/models/user';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';
import { useAuth } from '@/contexts/AuthContext';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedType, setSelectedType] = useState<string>('card');
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	const { data: userInfo, isLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchUserInfo,
	});

	if (!isAuthenticated) {
		router.push('/');
	}

	if (isLoading) return <Spinner />;

	return (
		<div>
			<Spacing margin="30px" />
			<CartOrderListInfoBox
				setTotalAmount={setTotalAmount}
				userId={userInfo?.id as number}
				selectedType={selectedType}
			/>
			<Spacing margin="54px" />
			<div className={s.cartOrderInfoFlexWrap}>
				<CartOrderEtcInfoBox userInfo={userInfo as UserInfo} />
				<CartPaymentInfoBox
					totalAmount={totalAmount}
					userId={userInfo?.id as number}
					selectedType={selectedType}
					setSelectedType={setSelectedType}
				/>
			</div>
		</div>
	);
};

export default CartMain;
