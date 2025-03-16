// import { fetchCartItemList } from '@/controllers/cart/fetchCartItemList';
// import { fetchUpdateCartItem } from '@/controllers/cart/fetchUpdateCartItem';
// import { fetchUpdateCartPayMethod } from '@/controllers/cart/fetchUpdateCartPayMethod';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import * as cs from '@/shared/styles/common.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import CartOrderListItem from './CartOrderListItem';
import CartOrderTotalInfoBox from './CartOrderTotalInfoBox';
import * as s from './CartStyle.css';
import Spinner from '@/shared/components/spinner/Spinner';
import { apiClient } from '@/controllers/new-api-service';
import type { CartItem } from '@/types/api';

interface Props {
	setTotalAmount: Dispatch<SetStateAction<number>>;
	userId: number | undefined;
	selectedType: string;
	setOrderItems: (items: any[]) => void;
}

const CartOrderListInfoBox = ({ setTotalAmount, setOrderItems, userId, selectedType }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: cartItems, isLoading, refetch } = useQuery<CartItem[]>({
		queryKey: ['cartItems', userId],
		queryFn: async () => {
			const result = await apiClient.getCartItems();
			return result.data;
		},
	});

	useEffect(() => {
		if (!cartItems) {
			setOrderItems([]);
			return;
		};
		console.log('cartItems:', cartItems);

		if (cartItems.length > 0) {
			const calculatedTotal = cartItems.reduce((acc: number, item: CartItem) => {
				// const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
				const discount = 0;
				const discountedPrice = item.price * (1 - discount / 100);
				return acc + discountedPrice * item.quantity;
			}, 0);
			setTotalAmount(calculatedTotal);
			setOrderItems(cartItems);
		} else {
			setTotalAmount(0);
		}
	}, [cartItems, selectedType, setTotalAmount]);

	const handleItemQuantityChange = useCallback(
		(cartId: number, newQuantity: number) => {
			updateCartMutation.mutate({ cartId, quantity: newQuantity });
		},
		[userId, queryClient],
	);

	const updateCartMutation = useMutation({
		mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) => {
			return apiClient.updateCartItem(cartId, {
				quantity,
			})
		},
		onSuccess: () => {
			refetch();
		},
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


	const deleteCartItemMutation = useMutation({
		mutationFn: (cartItemId: number) => apiClient.deleteCartItem(cartItemId),
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
		onError: (error: any) => {
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

	const deleteCartItemListMutation = useMutation({
		mutationFn: async () => {
			if (!cartItems) return null;
			const deletePromises = cartItems.map((item) => apiClient.deleteCartItem(item.cartId));
			return await Promise.all(deletePromises);
		},
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '삭제 성공',
				main: <AlertMainTextBox text="장바구니 리스트가 삭제되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({
				queryKey: ['cartItems'],
			});
		},
		onError: (error: any) => {
			open({
				width: '300px',
				height: '200px',
				title: '삭제 실패',
				main: <AlertMainTextBox text={error.message || '장바구니 리스트 삭제에 실패했습니다.'} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const handleDeleteAll = () => {
		open({
			width: '300px',
			height: '200px',
			title: '장바구니 삭제',
			main: <AlertMainTextBox text="장바구니 리스트를 삭제하시겠습니까?" />,
			rightButtonStyle: cs.lightBlueButton,
			rightButtonLabel: '확인',
			leftButtonStyle: cs.whiteAndBlackButton,
			leftButtonLabel: '취소',
			onRightButtonClick: () => {
				deleteCartItemListMutation.mutate();
				close();
			},
			onLeftButtonClick: close,
		});
	};

	const handleDelete = (id: number) => {
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

	const sortedCartItems = useMemo(() => {
		if (!cartItems) return [];
		return cartItems.sort((a, b) => a.cartId - b.cartId);
		// cartItems.slice().sort((a, b) => a.id - b.id);
	}, [cartItems]);

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
				{sortedCartItems.map((item: CartItem) => {
					// const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
					const discount = 0;
					const discountedPrice = Math.round(item.price * (1 - discount / 100));
					return (
						<CartOrderListItem
							key={item.cartId}
							id={item.cartId}
							icon={item?.imageUrl}
							name={item?.name}
							price={discountedPrice}
							quantity={item?.quantity}
							onQuantityChange={handleItemQuantityChange}
							handleDelete={handleDelete}
						/>
					);
				})}
			</div>
			<CartOrderTotalInfoBox
				handleDelete={handleDeleteAll}
				finalTotalPrice={sortedCartItems.reduce((acc: number, item: CartItem) => {
					// const discount = selectedType === 'card' ? item.cardDiscount : item.phoneDiscount;
					const discount = 0;
					const discountedPrice = Math.round(item.price * (1 - discount / 100));
					return acc + discountedPrice * item.quantity;
				}, 0)}
			/>
		</div>
	);
};

export default CartOrderListInfoBox;
