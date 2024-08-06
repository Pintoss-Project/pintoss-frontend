'use client';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import * as s from './AdminStyle.css';
import ChatIcon from '../icons/ChatIcon';

interface Order {
	order_id: number;
	order_no: string;
	user_name: string;
	email: string;
	phone: string;
	order_date: string;
	order_price: number;
	pay_status: string;
	isSendGift: boolean;
	selected?: boolean;
}

const AdminOrderMain = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [ordersPerPage] = useState<number>(10);
	const [currentPageGroup, setCurrentPageGroup] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/json/order.json');
			const data = await response.json();
			setOrders(data);
		};

		fetchData();
	}, []);

	const handleClickPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handlePageGroupChange = (direction: 'prev' | 'next' | 'first' | 'last') => {
		const totalGroups = Math.ceil(Math.ceil(orders.length / ordersPerPage) / 10);
		if (direction === 'prev' && currentPageGroup > 1) {
			setCurrentPageGroup(currentPageGroup - 1);
			setCurrentPage((currentPageGroup - 2) * 10 + 1);
		} else if (direction === 'next' && currentPageGroup < totalGroups) {
			setCurrentPageGroup(currentPageGroup + 1);
			setCurrentPage(currentPageGroup * 10 + 1);
		} else if (direction === 'first') {
			setCurrentPageGroup(1);
			setCurrentPage(1);
		} else if (direction === 'last') {
			setCurrentPageGroup(totalGroups);
			setCurrentPage((totalGroups - 1) * 10 + 1);
		}
	};

	const totalPages = Math.ceil(orders.length / ordersPerPage);
	const displayedOrders = orders.slice(
		(currentPage - 1) * ordersPerPage,
		currentPage * ordersPerPage,
	);

	const getPageNumbers = () => {
		const start = (currentPageGroup - 1) * 10 + 1;
		const end = Math.min(start + 9, totalPages);
		const pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div>
			<Spacing margin="30px" />
			<div style={{ height: '100%', border: `1px solid ${vars.color.lighterGray}` }}>
				<Flex
					justify="center"
					align="center"
					style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<div className={clsx(s.orderFlexItem1, s.darkGraySmallText)}>순번</div>
					<div className={clsx(s.orderFlexItem2, s.darkGraySmallText)}>주문번호</div>
					<div className={clsx(s.orderFlexItem3, s.darkGraySmallText)}>회원명</div>
					<div className={clsx(s.orderFlexItem4, s.darkGraySmallText)}>이메일주소</div>
					<div className={clsx(s.orderFlexItem5, s.darkGraySmallText)}>휴대폰</div>
					<div className={clsx(s.orderFlexItem6, s.darkGraySmallText)}>주문일시</div>
					<div className={clsx(s.orderFlexItem7, s.darkGraySmallText)}>주문금액</div>
					<div className={clsx(s.orderFlexItem8, s.darkGraySmallText)}>결제상태</div>
					<div className={clsx(s.orderFlexItem9, s.darkGraySmallText)}>상품권 전송</div>
				</Flex>
				{displayedOrders.map((order, index) => (
					<Flex
						justify="center"
						align="center"
						style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}
						key={order.order_id}>
						<div className={clsx(s.orderFlexItem1, s.darkGraySmallText)}>
							{(currentPage - 1) * ordersPerPage + index + 1}
						</div>
						<div className={clsx(s.orderFlexItem2, s.darkGraySmallText)}>{order.order_no}</div>
						<div className={clsx(s.orderFlexItem3, s.darkGraySmallText)}>{order.user_name}</div>
						<div className={clsx(s.orderFlexItem4, s.darkGraySmallText)}>{order.email}</div>
						<div className={clsx(s.orderFlexItem5, s.darkGraySmallText)}>{order.phone}</div>
						<div className={clsx(s.orderFlexItem6, s.darkGraySmallText)}>{order.order_date}</div>
						<div
							className={clsx(s.orderFlexItem7, s.darkGraySmallText)}
							style={{ fontWeight: 'bold' }}>
							{order.order_price.toLocaleString()} 원
						</div>
						<div
							className={clsx(s.orderFlexItem8, s.darkGraySmallText, {
								[s.completed]: order.pay_status === 'completed',
								[s.failed]: order.pay_status !== 'completed',
							})}>
							{' '}
							{order.pay_status === 'completed' ? '결제완료' : '결제실패'}
						</div>
						<div className={clsx(s.orderFlexItem9, s.darkGraySmallText)}>
							<div
								style={{
									width: '80%',
									maxWidth: '120px',
									padding: '8px',
									border: `1px solid ${vars.color.lighterGray}`,
									borderRadius: '6px',
									fontSize: '12px',
								}}>
								<Flex justify="space-between" align="center">
									<Flex align="center">
										<ChatIcon
											color={order.isSendGift ? vars.color.periwinkle : vars.color.lighterGray}
										/>
										<span
											style={{
												marginLeft: '2px',
												color: order.isSendGift ? vars.color.periwinkle : vars.color.lightGray,
											}}>
											상품권 전송
										</span>
									</Flex>
									<Flex
										justify="center"
										align="center"
										className={s.circleIcon}
										style={
											order.isSendGift
												? { backgroundColor: vars.color.periwinkle }
												: { backgroundColor: vars.color.lighterGray }
										}>
										✓
									</Flex>
								</Flex>
							</div>
						</div>
					</Flex>
				))}
			</div>
			<Spacing margin="30px" />
			<Flex justify="center" className={s.paginationBox} style={{ padding: '30px 0' }}>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('first')}>
					<MdKeyboardDoubleArrowLeft />
				</button>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('prev')}>
					<MdKeyboardArrowLeft />
				</button>
				{getPageNumbers().map((pageNumber) => (
					<button
						key={pageNumber}
						className={clsx(s.pageButton, { [s.activePageButton]: currentPage === pageNumber })}
						onClick={() => handleClickPage(pageNumber)}>
						{pageNumber}
					</button>
				))}
				<button className={s.pageButton} onClick={() => handlePageGroupChange('next')}>
					<MdKeyboardArrowRight />
				</button>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('last')}>
					<MdKeyboardDoubleArrowRight />
				</button>
			</Flex>
		</div>
	);
};

export default AdminOrderMain;
