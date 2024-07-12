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
			<span className={s.cartOrdererInfoText}>{title}</span>
			<span className={s.cartOrdererInfoText} style={{ color: vars.color.black }}>
				{value}
			</span>
		</Flex>
	);
};

export default CartOrdererInfoItem;
