'use client';

import * as s from './HomeStyle.css';
import * as cs from '@/shared/styles/common.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { Flex, GridItem } from '@/shared/components/layout';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	headerColor?: string;
	product: ProductType;
}

type ProductType = {
	id: number;
	code: string;
	name: string;
	card: number;
	phone: number;
	icon: string;
};

const HomeProductBox = ({ headerColor, product }: Props) => {
	return (
		<Link href={`/product/${product.code}`}>
			<GridItem className={s.homeProductBox}>
				<div
					className={s.homeProductBoxTop}
					style={assignInlineVars({ [s.headerColor]: headerColor || 'initial' })}></div>
				<div style={{ height: '45%', margin: '0px 16px' }}>
					<div style={{ height: '40%' }}></div>
					<Flex
						justify="center"
						style={{ height: '30%', color: vars.color.darkGray }}
						className={s.productName}>
						{product.name}
					</Flex>
					<Flex style={{ height: '30%' }}>
						<Flex justify="center" align="center" className={s.rateBox}>
							<span className={s.rateGrayText}>카드</span>
							<span className={s.rateRedText}>{product.card}%↓</span>
						</Flex>
						<div style={{ margin: '0px 3px' }}></div>
						<Flex justify="center" align="center" className={s.rateBox}>
							<span className={s.rateGrayText}>휴대폰</span>
							<span className={s.rateRedText}>{product.phone}%↓</span>
						</Flex>
					</Flex>
				</div>
				<div style={{ height: '30%', padding: '15px 16px' }}>
					<Button color={vars.color.white} className={cs.lightBlueButton}>
						구매하기
					</Button>
				</div>
				<div className={s.productIconBox}>
					<Image src={product.icon} alt="상품권 로고 이미지" width={106} height={106} />
				</div>
			</GridItem>
		</Link>
	);
};

export default HomeProductBox;
