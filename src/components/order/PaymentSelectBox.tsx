import { Flex } from '@/shared/components/layout';
import * as s from './CartStyle.css';
import { vars } from '@/shared/styles/theme.css';
import Spacing from '@/shared/components/layout/Spacing';

interface Props {
	sale: number;
	type: string;
	isSelected: boolean;
	onSelect: () => void;
}

const PaymentSelectBox = ({ sale, type, isSelected, onSelect }: Props) => {
	return (
		<div
			className={isSelected ? s.paymentMethodBoxSelected : s.paymentMethodBox}
			onClick={onSelect}>
			<div style={{ color: vars.color['sky-blue'], fontSize: '12px', textAlign: 'left' }}>
				할인 {sale}% ↓
			</div>
			<Spacing margin="9px" />
			<Flex justify="space-between" align="center">
				<div style={{ color: isSelected ? vars.color['sky-blue'] : vars.color['medium-gray'] }}>
					{type === 'card' ? '카드 결제' : '휴대폰 결제'}
				</div>
				<Flex
					justify="center"
					align="center"
					className={isSelected ? s.circleCheckIconSelected : s.circleCheckIcon}>
					✓
				</Flex>
			</Flex>
		</div>
	);
};

export default PaymentSelectBox;
