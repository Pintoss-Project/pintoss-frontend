import { fetchCartItemList } from '@/app/api/cart/fetchCartItemList';
import { fetchUpdateCartItem } from '@/app/api/cart/fetchUpdateCartItem';
import { fetchUpdateCartPayMethod } from '@/app/api/cart/fetchUpdateCartPayMethod';
import useAlertContext from '@/hooks/useAlertContext';
import { CartItemResponse } from '@/models/cart';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import * as cs from '@/shared/styles/common.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import CartOrderListItem from './CartOrderListItem';
import CartOrderTotalInfoBox from './CartOrderTotalInfoBox';
import * as s from './CartStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';

interface Props {
	setTotalAmount: Dispatch<SetStateAction<number>>;
	userId: number | undefined;
	selectedType: string;
}

const CartOrderListInfoBox = ({ setTotalAmount, userId, selectedType }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: cartItemsData, isLoading } = useQuery({
		queryKey: ['cartItems', userId],
		queryFn: () => fetchCartItemList(userId as number),
		enabled: !!userId,
	});

	const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

	useEffect(() => {
		if (cartItemsData?.data) {
			setCartItems(cartItemsData.data);
			queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
		}
	}, [cartItemsData, queryClient, userId]);

	useEffect(() => {
		if (cartItems.length > 0 && userId) {
			fetchUpdateCartPayMethod(userId, selectedType.toUpperCase()).then(() => {
				queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
			});
		}
	}, [cartItems.length, selectedType, userId, queryClient]);

	useEffect(() => {
		if (cartItems.length > 0) {
			const calculatedTotal = cartItems.reduce((acc: number, item: CartItemResponse) => {
				const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
				const discountedPrice = item.price * (1 - discount / 100);
				return acc + discountedPrice * item.quantity;
			}, 0);
			setTotalAmount(calculatedTotal);
		} else {
			setTotalAmount(0);
		}
	}, [cartItems, selectedType, setTotalAmount]);

	const handleItemQuantityChange = useCallback(
		(id: number, newQuantity: number) => {
			updateCartMutation.mutate({ id, quantity: newQuantity });
		},
		[userId, queryClient],
	);

	const updateCartMutation = useMutation({
		mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
			fetchUpdateCartItem(id, quantity),
		onError: () => {
			open({
				width: '300px',
				height: '200px',
				title: '오류 발생',
				main: <AlertMainTextBox text="알 수 없는 오류가 발생했습니다. 다시 시도해주세요." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const sortedCartItems = cartItems.slice().sort((a, b) => a.id - b.id);

	if (isLoading) return <Spinner />;

	return (
		<div className={s.cartOrderListInfoBox}>
			<div className={s.menuBarTitle}>
				<span className={s.flexItem1}></span>
				<span className={s.flexItem2}>상품명</span>
				<span className={s.flexItem3}>금액</span>
				<span className={s.flexItem4}>수량</span>
				<span className={s.flexItem5}>합계금액</span>
				<span className={s.flexItem6}></span>
			</div>
			<div>
				{sortedCartItems.map((item: CartItemResponse) => {
					const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
					const discountedPrice = Math.round(item.price * (1 - discount / 100));
					return (
						<CartOrderListItem
							key={item.id}
							id={item.id}
							icon={item?.logoImageUrl}
							name={item?.name}
							price={discountedPrice}
							quantity={item?.quantity}
							onQuantityChange={handleItemQuantityChange}
						/>
					);
				})}
			</div>
			<CartOrderTotalInfoBox
				userId={userId as number}
				finalTotalPrice={sortedCartItems.reduce((acc: number, item: CartItemResponse) => {
					const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
					const discountedPrice = Math.round(item.price * (1 - discount / 100));
					return acc + discountedPrice * item.quantity;
				}, 0)}
			/>
		</div>
	);
};

export default CartOrderListInfoBox;
