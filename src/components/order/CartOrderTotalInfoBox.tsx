import * as s from './CartStyle.css';

import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import React from 'react';

interface Props {
	finalTotalPrice: number;
}

const CartOrderTotalInfoBox = ({ finalTotalPrice }: Props) => {
	return (
		<Flex justify="space-between" align="center" className={s.cartOrderTotalInfoBox}>
			<div>
				<span style={{ fontSize: '20px', fontWeight: '600' }}>주문총액</span>
				<span className={s.orderTotalPrice}>{finalTotalPrice.toLocaleString()} 원</span>
			</div>
			<Button color={vars.color.white} className={s.cartRemoveButton}>
				장바구니 비우기
			</Button>
		</Flex>
	);
};

export default CartOrderTotalInfoBox;
