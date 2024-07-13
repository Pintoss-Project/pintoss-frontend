import * as s from './NavBarStyle.css';

import { Flex } from '@/shared/components/layout';
import Image from 'next/image';

interface Props {
	svg: string;
	name: string;
}

const SideNavBarProductsForSale = ({ svg, name }: Props) => {
	return (
		<>
			<Flex align="center">
				<Image src={svg} alt={`${name} 로고 이미지`} width={58} height={58} />
				<span className={s.darkGrayText}>{name}</span>
			</Flex>
		</>
	);
};

export default SideNavBarProductsForSale;
