'use client';

import * as s from './CartStyle.css';

import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
	icon: string;
	name: string;
	price: number;
	quantity: number;
}

const CartOrderListItem = ({ icon, name, price, quantity }: Props) => {
	const [count, setCount] = useState(quantity);

	return (
		<div className={s.cartOrderListItemBox}>
			<div className={s.cartOrderListItemLeftBox}>
				<div className={s.cartOrderListItemLeftInnerBox}>
					<Image
						src={icon}
						alt={`${name} 로고 이미지`}
						width={40}
						height={40}
						className={s.logoFlexItem}
					/>
					<div className={s.cartOrderListItemLeftSecondInnerBox}>
						<span className={clsx(s.flexItem2, s.cartOrderProductName)}>{name}</span>
						<span className={clsx(s.flexItem3, s.cartOrderProductPrice)}>
							{price.toLocaleString()} 원
						</span>
					</div>
				</div>
				<Flex justify="center" align="center" className={clsx(s.flexItem4)}>
					<Button
						color={vars.color.lighterGray}
						className={s.quantityLeftButton}
						onClick={() => setCount(count - 1)}>
						-
					</Button>
					<Flex justify="center" align="center" className={s.quantityText}>
						{count}
					</Flex>
					<Button
						color={vars.color.darkGray}
						className={s.quantityRightButton}
						onClick={() => setCount(count + 1)}>
						+
					</Button>
				</Flex>
			</div>
			<div className={s.cartOrderListItemRightBox}>
				<Flex justify="center" align="center" className={s.flexItem5}>
					<span className={clsx(s.darkBlueText)}>{(price * count).toLocaleString()} 원</span>
				</Flex>
				<Flex justify="center" align="center" className={s.flexItem6}>
					<Button color={vars.color.white} className={s.cartItemRemoveButton}>
						<Flex justify="center" align="center" style={{ width: '20px', height: '20px' }}>
							ㅡ
						</Flex>
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default CartOrderListItem;
