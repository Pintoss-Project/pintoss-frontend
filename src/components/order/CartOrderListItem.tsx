'use client';

import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as s from './CartStyle.css';
import * as cs from '@/shared/styles/common.css';
import useAlertContext from '@/hooks/useAlertContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCartItem } from '@/app/api/cart/deleteCart';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import CartError from '@/utils/error/CartError';

interface Props {
	id: number;
	icon: string;
	name: string;
	price: number;
	quantity: number;
	onQuantityChange: (id: number, newQuantity: number) => void;
}

const CartOrderListItem = ({ id, icon, name, price, quantity, onQuantityChange }: Props) => {
	const [count, setCount] = useState(quantity);
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const deleteCartItemMutation = useMutation({
		mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '삭제 성공',
				main: <AlertMainTextBox text="장바구니 아이템이 삭제되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['cartItems'],
			});
		},
		onError: (error: CartError) => {
			open({
				width: '300px',
				height: '200px',
				title: '삭제 실패',
				main: <AlertMainTextBox text={error.message || '장바구니 아이템 삭제에 실패했습니다.'} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

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

	const handleDelete = () => {
		open({
			width: '300px',
			height: '200px',
			title: '장바구니 아이템 삭제',
			main: <AlertMainTextBox text="장바구니 아이템을 삭제하시겠습니까?" />,
			rightButtonLabel: '확인',
			rightButtonStyle: cs.lightBlueButton,
			leftButtonLabel: '취소',
			leftButtonStyle: cs.whiteAndBlackButton,
			onRightButtonClick: () => {
				deleteCartItemMutation.mutate(id);
				close();
			},
			onLeftButtonClick: close,
		});
	};

	useEffect(() => {
		setCount(quantity);
	}, [quantity]);

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
						onClick={handleDelete}>
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
