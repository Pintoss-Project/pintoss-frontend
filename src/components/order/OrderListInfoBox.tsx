import { Flex } from '@/shared/components/layout';
import * as s from './OrderStyle.css';
import OrderListItem from './OrderListItem';

const ORDER_LIST_INFO = [
	{
		orderNo: '1234567-12345671',
		payResult: '결제완료',
		orderStatus: '주문완료',
		payment: '카드',
		orderDate: '2024-06-13',
		pay: '120000',
	},
	{
		orderNo: '1234567-12345672',
		payResult: '결제완료',
		orderStatus: '주문완료',
		payment: '카드',
		orderDate: '2024-06-13',
		pay: '120000',
	},
	{
		orderNo: '1234567-12345673',
		payResult: '결제완료',
		orderStatus: '주문완료',
		payment: '카드',
		orderDate: '2024-06-13',
		pay: '120000',
	},
	{
		orderNo: '1234567-12345674',
		payResult: '결제완료',
		orderStatus: '주문완료',
		payment: '카드',
		orderDate: '2024-06-13',
		pay: '120000',
	},
];

const OrderListInfoBox = () => {
	return (
		<div className={s.orderListInfoBox}>
			<Flex align="center" className={s.menuBarTitle}>
				<span className={s.flexItem1}>주문번호</span>
				<span className={s.flexItem2}>결제상태</span>
				<span className={s.flexItem3}>주문상태</span>
				<span className={s.flexItem4}>결제수단</span>
				<span className={s.flexItem5}>주문일시</span>
				<span className={s.flexItem6}>결제금액</span>
			</Flex>
			<div>
				{ORDER_LIST_INFO.map((order) => (
					<OrderListItem
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
