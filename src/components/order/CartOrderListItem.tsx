'use client';

import { fetchDeleteCartItem } from '@/controllers/cart/fetchDeleteCartItem';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import CartError from '@/utils/error/CartError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import * as s from './CartStyle.css';
import { apiClient } from '@/controllers/new-api-service';

interface Props {
	id: number;
	icon: string;
	name: string;
	price: number;
	quantity: number;
	onQuantityChange: (id: number, newQuantity: number) => void;
	handleDelete: (id: number) => void;
}

const CartOrderListItem = ({ id, icon, name, price, quantity, onQuantityChange, handleDelete }: Props) => {
	const [count, setCount] = useState(quantity);

	const handleIncrease = () => {
		const newCount = count + 1;
		setCount(newCount);
		onQuantityChange(id, newCount);
	};

	const handleDecrease = () => {
		if (count > 1) {
			const newCount = count - 1;
			setCount(newCount);
			onQuantityChange(id, newCount);
		}
	};

	useEffect(() => {
		setCount(quantity);
	}, [quantity]);

	return (
		<div className={s.cartOrderListItemBox}>
			<div className={s.cartOrderListItemLeftBox}>
				<div className={s.cartOrderListItemLeftInnerBox}>
					<Flex justify="center" style={{ width: '60px' }} className={s.logoFlexItem}>
						<img src={icon} alt={`${name} 로고 이미지`} style={{ height: '50px' }} />
					</Flex>
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
						onClick={handleDecrease}>
						-
					</Button>
					<Flex justify="center" align="center" className={s.quantityText}>
						{count}
					</Flex>
					<Button
						color={vars.color.darkGray}
						className={s.quantityRightButton}
						onClick={handleIncrease}>
						+
					</Button>
				</Flex>
			</div>
			<div className={s.cartOrderListItemRightBox}>
				<Flex justify="center" align="center" className={s.flexItem5}>
					<span className={clsx(s.darkBlueText)}>{(price * count).toLocaleString()} 원</span>
				</Flex>
				<Flex justify="center" align="center" className={s.flexItem6}>
					<Button
						color={vars.color.white}
						className={s.cartItemRemoveButton}
						onClick={() => handleDelete(id)}>
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
