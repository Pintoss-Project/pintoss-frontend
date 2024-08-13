import { CartItemResponse } from '@/models/cart';
import { Dispatch, SetStateAction, useEffect, useCallback, useState } from 'react';
import CartOrderListItem from './CartOrderListItem';
import CartOrderTotalInfoBox from './CartOrderTotalInfoBox';
import * as s from './CartStyle.css';
import * as cs from '@/shared/styles/common.css';
import useAlertContext from '@/hooks/useAlertContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateCart } from '@/app/api/cart/updateCart';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { getCartItems } from '@/app/api/cart/getCartItems';

interface Props {
	setTotalAmount: Dispatch<SetStateAction<number>>;
	userId: number | undefined;
	selectedType: string;
}

const CartOrderListInfoBox = ({ setTotalAmount, userId, selectedType }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: cartItemsData } = useQuery({
		queryKey: ['cartItems', userId],
		queryFn: () => getCartItems(userId as number),
		enabled: !!userId,
	});

	console.log(cartItemsData);

	const [cartItems, setCartItems] = useState<CartItemResponse[]>(cartItemsData?.data || []);
	const [cartItemsOrder, setCartItemsOrder] = useState<number[]>([]);

	useEffect(() => {
		if (cartItemsData?.data) {
			setCartItems(cartItemsData.data);
			if (cartItemsOrder.length === 0) {
				setCartItemsOrder(cartItemsData.data.map((item: CartItemResponse) => item.id));
			}
		}
	}, [cartItemsData, cartItemsOrder.length]);

	useEffect(() => {
		if (cartItems.length > 0) {
			const calculatedTotal = cartItems.reduce(
				(acc: number, item: CartItemResponse) => acc + item.price * item.quantity,
				0,
			);
			setTotalAmount(calculatedTotal);
		}
	}, [cartItems, setTotalAmount]);

	const handleItemQuantityChange = useCallback(
		(id: number, newQuantity: number) => {
			updateCartMutation.mutate(
				{ id, quantity: newQuantity },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['cartItems', userId] });
					},
				},
			);
		},
		[userId, queryClient],
	);

	const updateCartMutation = useMutation({
		mutationFn: ({ id, quantity }: { id: number; quantity: number }) => updateCart(id, quantity),
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

	const sortedCartItems = cartItemsOrder
		.map((orderId) => cartItems.find((item) => item.id === orderId))
		.filter(Boolean) as CartItemResponse[];

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
				{sortedCartItems.map((item: CartItemResponse) => (
					<CartOrderListItem
						key={item.id}
						id={item.id}
						icon={'/images/book-logo.png'}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						onQuantityChange={handleItemQuantityChange}
					/>
				))}
			</div>
			<CartOrderTotalInfoBox
				userId={userId as number}
				finalTotalPrice={sortedCartItems.reduce(
					(acc: number, item: CartItemResponse) => acc + item.price * item.quantity,
					0,
				)}
			/>
		</div>
	);
};

export default CartOrderListInfoBox;
