'use client';

import { SimpleProductInfo } from '@/models/product';
import { Button } from '@/shared/components/button';
import { Flex, GridItem } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import Link from 'next/link';
import * as s from './HomeStyle.css';

interface Props {
	headerColor?: string;
	product: SimpleProductInfo;
}

const HomeProductBox = ({ headerColor, product }: Props) => {
	return (
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
						<span className={s.rateRedText}>{product.cardDiscount}%↓</span>
					</Flex>
					<div className={s.rateBoxMarginBox}></div>
					<Flex justify="center" align="center" className={s.rateBox}>
						<span className={s.rateGrayText}>휴대폰</span>
						<span className={s.rateRedText}>{product.phoneDiscount}%↓</span>
					</Flex>
				</Flex>
			</div>
			<Link href={`/product/${product.id}`}>
				<div className={s.purchaseButtonWrap}>
					<Button
						color={vars.color.white}
						className={clsx(cs.lightBlueButton, s.purchaseButtonText)}>
						구매하기
					</Button>
				</div>
				<div className={s.productIconBox}>
					<img
						src={'/images/olive-logo.png'}
						alt="상품권 로고 이미지"
						className={s.productIconImage}
					/>
				</div>
			</Link>
		</GridItem>
	);
};

export default HomeProductBox;
