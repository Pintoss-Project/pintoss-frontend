import { Flex } from '@/shared/components/layout';
import * as s from './ProductDetailStyle.css';

interface Props {
	text: string;
}

const ProductInstructionItem = ({ text }: Props) => {
	return (
		<Flex align="center">
			<Flex justify="center" align="center" className={s.productInstructionCircle}>
				✓
			</Flex>
			<p className={s.productInstructionText}>{text}</p>
		</Flex>
	);
};

export default ProductInstructionItem;
