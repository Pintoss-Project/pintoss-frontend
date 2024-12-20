import { vars } from '@/shared/styles/theme.css';
import * as s from './OrderStyle.css';

import { Flex } from '@/shared/components/layout';

interface Props {
	orderNo: string;
	payResult: string;
	orderStatus: string;
	payment: string;
	orderDate: string;
	pay: string;
}

const OrderListItem = ({ orderNo, payResult, orderStatus, payment, orderDate, pay }: Props) => {
	return (
		<Flex align="center" className={s.orderListItem}>
			<span className={s.flexItem1} style={{ color: vars.color.darkGray }}>
				{orderNo}
			</span>
			<span className={s.flexItem2} style={{ color: vars.color.skyBlue }}>
				{payResult}
			</span>
			<span className={s.flexItem3} style={{ color: vars.color.darkBlue }}>
				{orderStatus}
			</span>
			<span className={s.flexItem4} style={{ color: vars.color.darkGray }}>
				{payment}
			</span>
			<span className={s.flexItem5} style={{ color: vars.color.darkGray }}>
				{orderDate}
			</span>
			<span className={s.flexItem6} style={{ color: vars.color.darkGray }}>
				{pay}
			</span>
		</Flex>
	);
};

export default OrderListItem;
