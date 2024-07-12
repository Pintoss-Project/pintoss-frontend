import * as s from './CartStyle.css';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';

interface Props {
	selectedType: string;
	saleRate: number;
	totalAmount: number;
}

const ConfirmAndPayTheAmountBox = ({ selectedType, saleRate, totalAmount }: Props) => {
	return (
		<div>
			<div style={{ fontWeight: '500', textAlign: 'left' }}>금액 확민 및 결제</div>
			<Spacing margin="10px" />
			<div className={s.confirmAndPayTheAmountBox}>
				<Flex justify="space-between" align="center">
					<span className={s.grayText}>결제 수단</span>
					<span className={s.grayText} style={{ fontWeight: 'bold' }}>
						{selectedType === 'card' ? '카드' : '휴대폰'} 결제
					</span>
				</Flex>
				<Spacing margin="15px" />
				<div style={{ border: `1px dashed ${vars.color.paleGray}` }} />
				<Spacing margin="15px" />
				<Flex justify="space-between" align="center">
					<span className={s.grayText}>상품 합계금액</span>
					<span className={s.grayText} style={{ fontWeight: 'bold' }}>
						{((totalAmount * (100 - saleRate) * 1) / 100).toLocaleString()} 원
					</span>
				</Flex>
			</div>
		</div>
	);
};

export default ConfirmAndPayTheAmountBox;
