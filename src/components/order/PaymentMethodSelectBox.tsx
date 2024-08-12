'use client';

import * as s from './CartStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import PaymentSelectBox from './PaymentSelectBox';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	selectedType: string;
	setSelectedType: Dispatch<SetStateAction<string>>;
	cardDiscount: number;
	phoneDiscount: number;
}

const PaymentMethodSelectBox = ({
	selectedType,
	setSelectedType,
	cardDiscount,
	phoneDiscount,
}: Props) => {
	const handleSelect = (type: string) => {
		setSelectedType(type);
	};

	return (
		<div>
			<div className={s.payInfoTitle}>결제 수단 선택</div>
			<Spacing margin="10px" />
			<Flex>
				<PaymentSelectBox
					sale={cardDiscount}
					type="card"
					isSelected={selectedType === 'card'}
					onSelect={() => handleSelect('card')}
				/>
				<PaymentSelectBox
					sale={phoneDiscount}
					type="phone"
					isSelected={selectedType === 'phone'}
					onSelect={() => handleSelect('phone')}
				/>
			</Flex>
		</div>
	);
};

export default PaymentMethodSelectBox;
