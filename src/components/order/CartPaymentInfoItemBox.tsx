'use client';

import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './CartStyle.css';
import ConfirmAndPayTheAmountBox from './ConfirmAndPayTheAmountBox';

import PaymentMethodSelectBox from './PaymentMethodSelectBox';
import { Flex } from '@/shared/components/layout';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '@/app/api/cart/getCartItems';

interface Props {
	totalAmount: number;
	userId: number;
}

const CartPaymentInfoItemBox = ({ totalAmount, userId }: Props) => {
	const [selectedType, setSelectedType] = useState<string>('card');
	const [saleRate, setSaleRate] = useState(0);

	const { data: cartItemsData } = useQuery({
		queryKey: ['cartItems', userId],
		queryFn: () => getCartItems(userId as number),
		enabled: !!userId,
	});

	console.log(cartItemsData?.data);

	useEffect(() => {
		setSaleRate(selectedType === 'card' ? 1.2 : 0);
	}, [selectedType]);

	return (
		<div className={s.cartPaymentInfoItemBox}>
			<PaymentMethodSelectBox selectedType={selectedType} setSelectedType={setSelectedType} />
			<Spacing margin="30px" />
			<ConfirmAndPayTheAmountBox
				selectedType={selectedType}
				saleRate={saleRate}
				totalAmount={totalAmount}
			/>
			<Spacing margin="30px" />
			<Flex justify="space-between" align="center" className={s.totalPayAmountBox}>
				<span className={s.whiteText}>최종 결제 금액</span>
				<span className={s.whiteText} style={{ fontWeight: 'bold' }}>
					{((totalAmount * (100 - saleRate) * 1) / 100).toLocaleString()} 원
				</span>
			</Flex>
			<Spacing margin="15px" />
			<Button
				color={vars.color.white}
				className={clsx(s.responsiveLargeText, cs.lightBlueButton)}
				style={{ height: '60px', maxWidth: '100%' }}>
				결제요청
			</Button>
		</div>
	);
};

export default CartPaymentInfoItemBox;
