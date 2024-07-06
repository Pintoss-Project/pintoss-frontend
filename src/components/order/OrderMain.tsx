import Spacing from '@/shared/components/layout/Spacing';
import React from 'react';
import InfoBox from '../InfoBox';
import { Flex } from '@/shared/components/layout';
import OrderListInfoBox from './OrderListInfoBox';
import LoginHistoryInfoBox from './LoginHistoryInfoBox';
import OrderInstructionInfoBox from './OrderInstructionInfoBox';

const OrderMain = () => {
	return (
		<div>
			<Spacing margin="30px" />
			<OrderListInfoBox />
			<Spacing margin="50px" />
			<Flex>
				<InfoBox title="로그인 내역" info={<LoginHistoryInfoBox />} />
				<InfoBox title="주문 안내사항" info={<OrderInstructionInfoBox />} />
			</Flex>
		</div>
	);
};

export default OrderMain;
