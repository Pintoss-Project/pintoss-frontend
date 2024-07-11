import * as s from './OrderStyle.css';
import { Flex } from '@/shared/components/layout';

interface Props {
	text: string;
}

const OrderInstructionItem = ({ text }: Props) => {
	return (
		<Flex align="center">
			<Flex justify="center" align="center" className={s.orderInstructionCircle}>
				✓
			</Flex>
			<p className={s.orderInstructionText}>{text}</p>
		</Flex>
	);
};

export default OrderInstructionItem;
