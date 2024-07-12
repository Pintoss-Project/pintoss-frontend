import { FiMenu } from 'react-icons/fi';
import { Flex } from '@/shared/components/layout';
import * as s from './ResponsiveStyle.css';
import Image from 'next/image';
import GradientFiMenu from '../icons/GradientFiMenu';

const TableMenuBox = () => {
	return (
		<div>
			<Flex className={s.tableMenuNavBox}>
				<Image src="/images/cart-icon.png" alt="장바구니 아이콘" />
			</Flex>
			<div></div>
			<div></div>
		</div>
	);
};

export default TableMenuBox;
