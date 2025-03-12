import { vars } from '@/shared/styles/theme.css';
import * as s from './OrderStyle.css';

import { Flex } from '@/shared/components/layout';
import Link from 'next/link';

interface Props {
	orderNo: string;
	payResult: string;
	orderStatus: string;
	payment: string;
	orderDate: string;
	price: number;
}

const OrderListItem = ({ orderNo, payResult, orderStatus, payment, orderDate, price }: Props) => {
	return (
		<Flex align="center" className={s.orderListItem}>
			<span className={s.flexItem1} style={{ color: vars.color.darkGray }}>
				{orderNo}
			</span>
			<span className={s.flexItem2} style={{ color: vars.color.skyBlue }}>
				{payResult}
			</span>
			{/* <span className={s.flexItem3} style={{ color: vars.color.darkBlue }}>
				{orderStatus}
			</span> */}
			<span className={s.flexItem4} style={{ color: vars.color.darkGray }}>
				{payment}
			</span>
			<span className={s.flexItem5} style={{ color: vars.color.darkGray }}>
				{orderDate}
			</span>
			<span className={s.flexItem6} style={{ color: vars.color.darkGray }}>
				{price.toLocaleString()}원
			</span>
			<span className={s.flexItem6} style={{ color: vars.color.darkGray }}>
				<Link href={`/order/detail/${orderNo}`}>
				상세보기
				</Link>
			</span>
		</Flex>
	);
};

export default OrderListItem;
