'use client';

import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './CartStyle.css';
import ConfirmAndPayTheAmountBox from './ConfirmAndPayTheAmountBox';

import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PaymentMethodSelectBox from './PaymentMethodSelectBox';

interface Props {
	totalAmount: number;
	userId: number;
	selectedType: string;
	setSelectedType: Dispatch<SetStateAction<string>>;
}

const CartPaymentInfoItemBox = ({ totalAmount, selectedType, setSelectedType }: Props) => {
	const [payAmount, setPayAmount] = useState(0);

	useEffect(() => {
		if (selectedType === 'phone') {
			setPayAmount(totalAmount * 1.1);
		} else {
			setPayAmount(totalAmount);
		}
	}, [totalAmount, selectedType]);

	return (
		<div className={s.cartPaymentInfoItemBox}>
			<PaymentMethodSelectBox selectedType={selectedType} setSelectedType={setSelectedType} />
			<Spacing margin="30px" />
			<ConfirmAndPayTheAmountBox
				selectedType={selectedType}
				totalAmount={Math.round(totalAmount)}
				setPayAmount={setPayAmount}
			/>
			<Spacing margin="30px" />
			<Flex justify="space-between" align="center" className={s.totalPayAmountBox}>
				<span className={s.whiteText}>최종 결제 금액</span>
				<span className={s.whiteText} style={{ fontWeight: 'bold' }}>
					{Math.round(payAmount).toLocaleString()} 원
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
