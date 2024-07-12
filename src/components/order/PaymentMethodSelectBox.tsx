'use client';

import * as s from './CartStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import PaymentSelectBox from './PaymentSelectBox';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	selectedType: string;
	setSelectedType: Dispatch<SetStateAction<string>>;
}

const PaymentMethodSelectBox = ({ selectedType, setSelectedType }: Props) => {
	const handleSelect = (type: string) => {
		setSelectedType(type);
	};

	return (
		<div>
			<div className={s.payInfoTitle}>결제 수단 선택</div>
			<Spacing margin="10px" />
			<Flex>
				<PaymentSelectBox
					sale={1.2}
					type="card"
					isSelected={selectedType === 'card'}
					onSelect={() => handleSelect('card')}
				/>
				<PaymentSelectBox
					sale={0}
					type="phone"
					isSelected={selectedType === 'phone'}
					onSelect={() => handleSelect('phone')}
				/>
			</Flex>
		</div>
	);
};

export default PaymentMethodSelectBox;
