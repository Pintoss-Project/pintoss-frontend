'use client';

import * as s from './HomeStyle.css';
import * as cs from '@/shared/styles/common.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { Flex, GridItem } from '@/shared/components/layout';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

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
				<div className={s.homeProductTextBox}>
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
						<div className={s.rateBoxMarginBox}></div>
						<Flex justify="center" align="center" className={s.rateBox}>
							<span className={s.rateGrayText}>휴대폰</span>
							<span className={s.rateRedText}>{product.phone}%↓</span>
						</Flex>
					</Flex>
				</div>
				<div className={s.purchaseButtonWrap}>
					<Button
						color={vars.color.white}
						className={clsx(cs.lightBlueButton, s.purchaseButtonText)}>
						구매하기
					</Button>
				</div>
				<div className={s.productIconBox}>
					<img src={product.icon} alt="상품권 로고 이미지" className={s.productIconImage} />
				</div>
			</GridItem>
		</Link>
	);
};

export default HomeProductBox;
