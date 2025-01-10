'use client';

import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import { UserInfo } from '@/models/user';
import authState from '@/recoil/authAtom';
import Spacing from '@/shared/components/layout/Spacing';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import CartOrderEtcInfoBox from './CartOrderEtcInfoBox';
import CartOrderListInfoBox from './CartOrderListInfoBox';
import CartPaymentInfoBox from './CartPaymentInfoBox';
import * as s from './CartStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';

const CartMain = () => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [selectedType, setSelectedType] = useState<string>('card');
	const router = useRouter();

	const { data: userInfo, isLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchUserInfo,
	});

	const authStateValue = useRecoilValue(authState);
	const { isLoggedIn } = authStateValue;

	if (!isLoggedIn) {
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
