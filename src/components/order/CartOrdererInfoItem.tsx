import { vars } from '@/shared/styles/theme.css';
import * as s from './CartStyle.css';
import { Flex } from '@/shared/components/layout';

interface Props {
	title: string;
	value: string;
}

const CartOrdererInfoItem = ({ title, value }: Props) => {
	return (
		<Flex justify="space-between" align="center" className={s.cartOrdererInfoItem}>
			<span style={{ color: vars.color['dark-gray'] }}>{title}</span>
			<span>{value}</span>
		</Flex>
	);
};

export default CartOrdererInfoItem;
