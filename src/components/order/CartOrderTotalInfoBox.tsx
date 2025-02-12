import { fetchDeleteCartItemList } from '@/app/api_n/cart/fetchDeleteCartItemList';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import CartError from '@/utils/error/CartError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as s from './CartStyle.css';

interface Props {
	finalTotalPrice: number;
	userId: number;
}

const CartOrderTotalInfoBox = ({ finalTotalPrice, userId }: Props) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const deleteCartItemListMutation = useMutation({
		mutationFn: (userId: number) => fetchDeleteCartItemList(userId),
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
		onError: (error: CartError) => {
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

	const handleDelete = () => {
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
				deleteCartItemListMutation.mutate(userId);
				close();
			},
			onLeftButtonClick: close,
		});
	};

	return (
		<Flex justify="space-between" align="center" className={s.cartOrderTotalInfoBox}>
			<div>
				<span className={s.orderTotalText}>주문총액</span>
				<span className={s.orderTotalPrice}>{finalTotalPrice?.toLocaleString()} 원</span>
			</div>
			<Button color={vars.color.white} className={s.cartRemoveButton} onClick={handleDelete}>
				장바구니 비우기
			</Button>
		</Flex>
	);
};

export default CartOrderTotalInfoBox;
