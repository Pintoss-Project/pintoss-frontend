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

interface Props {
	totalAmount: number;
}

const CartPaymentInfoItemBox = ({ totalAmount }: Props) => {
	const [selectedType, setSelectedType] = useState<string>('card');
	const [saleRate, setSaleRate] = useState(0);

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
			<Button color={vars.color.white} className={cs.lightBlueButton} style={{ fontSize: '20px' }}>
				결제요청
			</Button>
		</div>
	);
};

export default CartPaymentInfoItemBox;
