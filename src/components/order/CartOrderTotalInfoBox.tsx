import { fetchDeleteCartItemList } from '@/controllers/cart/fetchDeleteCartItemList';
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
	handleDelete: () => void;
}

const CartOrderTotalInfoBox = ({ finalTotalPrice, handleDelete }: Props) => {
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
