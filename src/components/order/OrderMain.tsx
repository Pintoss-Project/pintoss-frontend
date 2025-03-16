'use client';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import InfoBox from '../InfoBox';
import LoginHistoryInfoBox from './LoginHistoryInfoBox';
import OrderInstructionInfoBox from './OrderInstructionInfoBox';
import OrderListInfoBox from './OrderListInfoBox';
import * as s from './OrderStyle.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/controllers/new-api-service';

const OrderMain = () => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		router.push('/');
	}

	const {data, isLoading, refetch} = useQuery({
		queryKey: ['orderList'],
		queryFn: () => {
			return apiClient.getOrderList();
		},
	})

	return (
		<div>
			<Spacing margin="30px" />
			{isLoading && <div>로딩중...</div>}
			{data && <OrderListInfoBox orderItems={data.data} />}
			<Spacing margin="50px" />
			<Flex className={s.orderInstructionFlexBox}>
				<InfoBox title="로그인 내역" info={<LoginHistoryInfoBox />} />
				<InfoBox title="주문 안내사항" info={<OrderInstructionInfoBox />} />
			</Flex>
		</div>
	);
};

export default OrderMain;
