'use client';

import Spacing from '@/shared/components/layout/Spacing';
import React, { useEffect, useState } from 'react';
import * as s from './OrderStyle.css';
import { Divider, Flex } from '@/shared/components/layout';
import InfoBox from '../InfoBox';
import { vars } from '@/shared/styles/theme.css';
import { useAuth } from '@/contexts/AuthContext';
import OrderInstructionInfoBox from './OrderInstructionInfoBox';
import { apiClient } from '@/controllers/new-api-service';
import { useQuery } from '@tanstack/react-query';
import type { OrderDetail } from '@/types/api';

interface Props {
    orderId: string;
}

export default function OrderDetail({ orderId }: Props) {
    const { user } = useAuth();

    const {data: order, isLoading} = useQuery<OrderDetail>({
        queryKey: ['orderDetail', orderId],
        queryFn: async () => {
            const result = await apiClient.getOrderDetail(orderId);
            return result.data;
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <div>
            <Spacing margin="30px" />
            <div style={{ display: "flex", justifyContent: "start" }}>
                <p>주문번호: {order.orderNo}</p>
                {/* <p>Status: {order.status}</p>
                <p>Total Amount: {order.totalAmount}</p> */}
            </div>
            <Spacing margin="18px" />
            <div className={s.orderListInfoBox}>
                <Flex align="center" className={s.menuBarTitle}>
                    <span className={s.flexItem1}>상품명</span>
                    <span className={s.flexItem3}>가격</span>
                    <span className={s.flexItem1}>발권상태</span>
                    <span className={s.flexItem1}>핀번호</span>
                </Flex>
                <div>
                    {order.orderItems.map((item) => (
                        <Flex key={item.pinNum} align="center" className={s.orderListItem}>
                            <span className={s.flexItem1} style={{ color: vars.color.darkGray }}>
                                {item.productName}
                            </span>
                            <span className={s.flexItem3} style={{ color: vars.color.darkGray }}>
                                {item.price.toLocaleString()}원
                            </span>
                            <span className={s.flexItem1} style={{ color: vars.color.skyBlue }}>
                                {item.status}
                            </span>
                            <span className={s.flexItem1} style={{ color: vars.color.darkBlue }}>
                                {item.pinNum}
                            </span>
                        </Flex>
                    ))}
                </div>
            </div>
            <Spacing margin="50px" />
            <Flex className={s.orderInstructionFlexBox}>
                <Flex direction="column" style={{ width: '100%' }}>
                    <InfoBox title="주문자 정보" className={s.memberInfoBox} info={(
                        <Flex direction="column" className={s.memberInfoFlexBox}>
                            <Flex justify="space-between" align="center" className={s.detailInfoRow}>
                                <span className={s.darkGrayText}>주문자명</span>
                                <span className={s.darkerGrayText}>
                                    {user?.name}
                                </span>
                            </Flex>
                            <Divider color={vars.color.paleGray} />
                            <Flex justify="space-between" align="center" className={s.detailInfoRow}>
                                <span className={s.darkGrayText}>휴대폰</span>
                                <span className={s.darkerGrayText}>
                                    {user?.phone}
                                </span>
                            </Flex>
                            <Divider color={vars.color.paleGray} />
                            <Flex justify="space-between" align="center" className={s.detailInfoRow}>
                                <span className={s.darkGrayText}>주문일</span>
                                <span className={s.darkerGrayText}>
                                    {order.orderDate}
                                </span>
                            </Flex>
                        </Flex>
                    )} />
                    <Spacing margin="30px" />
                    <Flex direction="column" style={{ marginRight: '20px' }}>
                        <h3 className={s.infoTitle}>유의사항</h3>
                        <Spacing margin="10px" />
                        <OrderInstructionInfoBox />
                    </Flex>
                </Flex>
                <InfoBox title="결제정보" info={(
                    <Flex direction="column" gap={16} >
                        <Flex direction="row" justify="space-between" className={s.paymentInfoBox}>
                            <p>결제 수단: </p>
                            <p>카드</p>
                        </Flex>
                        <Flex direction="row" justify="space-between" className={s.paymentInfoBox}>
                            <p>결제 상태:</p>
                            <p>{order.orderStatus}</p>
                        </Flex>
                        <Flex direction="row" justify="space-between" className={s.paymentInfoBoxDanger}>
                            <p style={{ color: vars.color.white }}>결제 금액:</p>
                            <p style={{ color: vars.color.white }}>{order.totalPrice.toLocaleString()}원</p>
                        </Flex>
                    </Flex>
                )} />
            </Flex>
        </div>
    );
}