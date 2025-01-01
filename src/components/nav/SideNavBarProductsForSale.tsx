'use client';
import * as s from './NavBarStyle.css';

import { Flex } from '@/shared/components/layout';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	svg: string;
	name: string;
	productId: number;
}

const SideNavBarProductsForSale = ({ svg, name, productId }: Props) => {
	return (
		<Link href={`/product/${productId}`} style={{ cursor: 'pointer' }}>
			<Flex align="center">
				<Image src={svg} alt={`${name} 로고 이미지`} width={58} height={58} />
				<span className={s.darkGrayText}>{name}</span>
			</Flex>
		</Link>
	);
};

export default SideNavBarProductsForSale;
