import { Flex } from '@/shared/components/layout';
import * as s from './CartStyle.css';
import CartOrderListItem from './CartOrderListItem';
import { CultureLandLogo } from '../../../public/svgs';
import CartOrderTotalInfoBox from './CartOrderTotalInfoBox';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
	setTotalAmount: Dispatch<SetStateAction<number>>;
}

const CART_ORDER_ITEM_LIST = [
	{ id: 1, icon: CultureLandLogo, name: '컬쳐랜드 1만원권', price: 10000, quantity: 10 },
	{ id: 2, icon: CultureLandLogo, name: '컬쳐랜드 1만원권', price: 10000, quantity: 10 },
];

const CartOrderListInfoBox = ({ setTotalAmount }: Props) => {
	const totalAmount = CART_ORDER_ITEM_LIST.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	useEffect(() => {
		setTotalAmount(totalAmount);
	}, []);

	return (
		<div className={s.cartOrderListInfoBox}>
			<Flex align="center" className={s.menuBarTitle}>
				<span className={s.flexItem1}></span>
				<span className={s.flexItem2}>상품명</span>
				<span className={s.flexItem3}>금액</span>
				<span className={s.flexItem4}>수량</span>
				<span className={s.flexItem5}>합계금액</span>
				<span className={s.flexItem6}></span>
			</Flex>
			<div>
				{CART_ORDER_ITEM_LIST.map((item) => (
					<CartOrderListItem
						key={item.id}
						icon={item.icon}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
					/>
				))}
			</div>
			<CartOrderTotalInfoBox finalTotalPrice={totalAmount} />
		</div>
	);
};

export default CartOrderListInfoBox;
