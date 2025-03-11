import { Flex } from '@/shared/components/layout';
import * as s from './OrderStyle.css';
import OrderListItem from './OrderListItem';

type OrderItem = {
	orderNo: string;
	payResult: string;
	orderStatus: string;
	payment: string;
	orderDate: string;
	pay: string;
};

interface Props {
	orderItems: OrderItem[];
}

const OrderListInfoBox = ({orderItems}:Props) => {
	return (
		<div className={s.orderListInfoBox}>
			<Flex align="center" className={s.menuBarTitle}>
				<span className={s.flexItem1}>주문번호</span>
				<span className={s.flexItem2}>결제상태</span>
				<span className={s.flexItem3}>주문상태</span>
				<span className={s.flexItem4}>결제수단</span>
				<span className={s.flexItem5}>주문일시</span>
				<span className={s.flexItem6}>결제금액</span>
				<span className={s.flexItem6}>상세보기</span>
			</Flex>
			<div>
				{orderItems.map((order) => (
					<OrderListItem
						key={order.orderNo}
						orderNo={order.orderNo}
						payResult={order.payResult}
						orderStatus={order.orderStatus}
						payment={order.payment}
						orderDate={order.orderDate}
						pay={order.pay}
					/>
				))}
			</div>
		</div>
	);
};

export default OrderListInfoBox;
