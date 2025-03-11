'use client';

import Spacing from '@/shared/components/layout/Spacing';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as s from './OrderStyle.css';
import { Divider, Flex } from '@/shared/components/layout';
import InfoBox from '../InfoBox';
import { vars } from '@/shared/styles/theme.css';
import { useAuth } from '@/contexts/AuthContext';
import OrderInstructionInfoBox from './OrderInstructionInfoBox';

const DUMMY_ORDER: OrderDetail = {
    id: '1',
    orderNumber: '1234567-12345671',
    orderDate: '2021-09-01',
    status: '주문완료',
    totalAmount: 120000,
    items: [
        {
            id: '1',
            name: 'item1',
            state: "발권완료",
            pin: "abasdfasdf-asdfasdfasdf",
        },
        {
            id: '2',
            name: 'item2',
            state: "발권중",
            pin: "...",
        },
    ],
};


interface OrderDetail {
    id: string;
    orderNumber: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    items: Array<{
        id: string;
        name: string;
        state: string;
        pin: string;
    }>;
}

interface Props {
    orderId: string;
}

export default function OrderDetail({ orderId }: Props) {
    const { user } = useAuth();

    const [order, setOrder] = useState<OrderDetail | null>(DUMMY_ORDER);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchOrderDetail = async () => {
    //         try {
    //             // Replace with your actual API endpoint
    //             const response = await fetch(`/api/orders/${orderId}`);
    //             const data = await response.json();
    //             setOrder(data);
    //         } catch (error) {
    //             console.error('Error fetching order:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchOrderDetail();
    // }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <div>
            <Spacing margin="30px" />
            <div style={{ display: "flex", justifyContent: "start" }}>
                <p>주문번호: {orderId}</p>
                {/* <p>Status: {order.status}</p>
                <p>Total Amount: {order.totalAmount}</p> */}
            </div>
            <Spacing margin="18px" />
            <div className={s.orderListInfoBox}>
                <Flex align="center" className={s.menuBarTitle}>
                    <span className={s.flexItem3}></span>
                    <span className={s.flexItem1}>상품명</span>
                    <span className={s.flexItem1}>발권상태</span>
                    <span className={s.flexItem1}>핀번호</span>
                </Flex>
                <div>
                    {order.items.map((item) => (
                        <Flex key={item.id} align="center" className={s.orderListItem}>
                            <span className={s.flexItem3} style={{ color: vars.color.darkGray }}>
                                {item.id}
                            </span><span className={s.flexItem1} style={{ color: vars.color.darkGray }}>
                                {item.name}
                            </span>
                            <span className={s.flexItem1} style={{ color: vars.color.skyBlue }}>
                                {item.state}
                            </span>
                            <span className={s.flexItem1} style={{ color: vars.color.darkBlue }}>
                                {item.pin}
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
                            <p>{order.status}</p>
                        </Flex>
                        <Flex direction="row" justify="space-between" className={s.paymentInfoBoxDanger}>
                            <p style={{ color: vars.color.white }}>결제 금액:</p>
                            <p style={{ color: vars.color.white }}>{order.totalAmount.toLocaleString()}원</p>
                        </Flex>
                    </Flex>
                )} />
            </Flex>
        </div>
    );
}