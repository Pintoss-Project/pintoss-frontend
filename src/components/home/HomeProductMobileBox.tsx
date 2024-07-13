'use client';

import { Flex, GridItem } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import Link from 'next/link';
import * as s from './HomeStyle.css';
import Image from 'next/image';

type ProductType = {
	id: number;
	code: string;
	name: string;
	card: number;
	phone: number;
	icon: string;
};

interface Props {
	headerColor?: string;
	product: ProductType;
}

const HomeProductMobileBox = ({ headerColor, product }: Props) => {
	return (
		<Link href={`/product/${product.code}`}>
			<GridItem className={s.homeProductMobileBox}>
				<div
					className={s.homeProductBoxTop}
					style={assignInlineVars({ [s.headerColor]: headerColor || 'initial' })}></div>
				<div className={s.homeProductTextBox}>
					<div style={{ height: '40%' }}></div>
					<Flex
						justify="center"
						style={{ height: '30%', color: vars.color.darkGray }}
						className={s.mobileBoxProductName}>
						{product.name}
					</Flex>
				</div>
				<div className={s.productIconBox}>
					<Image
						src={product.icon}
						alt="상품권 로고 이미지"
						className={s.productIconImage}
						width={70}
						height={70}
					/>
				</div>
			</GridItem>
		</Link>
	);
};

export default HomeProductMobileBox;
