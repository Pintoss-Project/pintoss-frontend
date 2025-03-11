import * as s from './OrderStyle.css';
import { Flex } from '@/shared/components/layout';

interface Props {
	text: string;
}

const OrderInstructionItem = ({ text }: Props) => {
	return (
		<Flex align="start">
			<Flex className={s.orderInstructionCircle} grow={0} shrink={0}>
				✓
			</Flex>
			<Flex grow={1} shrink={1}><p className={s.orderInstructionText} style={{
				wordWrap: 'break-word'
			}}>{text}</p></Flex>
		</Flex>
	);
};

export default OrderInstructionItem;
