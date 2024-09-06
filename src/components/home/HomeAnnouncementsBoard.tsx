'use client';

import { fetchBoardList } from '@/app/api/board/fetchBoardList';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { formatDate } from '@/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import * as s from './HomeStyle.css';

const ANNOUNCEMENTS_MENU = [
	{ id: 'NOTICE', name: '공지사항' },
	{ id: 'FAQS', name: '자주 묻는 질문' },
];

const HomeAnnouncementsBoard = () => {
	const [selectedMenu, setSelectedMenu] = useState<string>('NOTICE');
	const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

	const { data: boardList } = useQuery({
		queryKey: ['boardList', selectedMenu],
		queryFn: () => fetchBoardList(selectedMenu),
	});

	const handleMenuClick = (id: string) => {
		setSelectedMenu(id);
	};

	const handleExpandClick = (id: number) => {
		setExpandedItems((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	return (
		<div className={s.homeAnnouncementsBoard}>
			<Flex>
				{ANNOUNCEMENTS_MENU.map((menu) => (
					<span
						key={menu.id}
						id={menu.id}
						className={`${s.filterMenu} ${selectedMenu === menu.id ? 'selected' : ''}`}
						onClick={() => handleMenuClick(menu.id)}>
						{menu.name}
					</span>
				))}
			</Flex>
			<Spacing margin="20px" />
			<Flex justify="center" align="center" className={s.announceMenuBox}>
				<span className={s.flexItem1}></span>
				<span className={s.flexItem2}>제목</span>
				<span className={s.flexItem3}>작성일</span>
				<span className={s.flexItem4}></span>
			</Flex>
			{boardList?.data?.slice(0, 5).map((content) => (
				<div key={content.id}>
					<Flex justify="center" align="center" className={s.announceContent}>
						<div className={s.flexItem1}>
							<Flex justify="center" align="center" className={s.announceTag}>
								{content.type === 'NOTICE' ? '알림' : '질문'}
							</Flex>
						</div>
						<span className={s.announceContentText}>{content.title}</span>
						<span className={s.announceDate}>{formatDate(content.createdAt as string)}</span>
						<IoIosArrowDown
							className={`s.announceArrowIcon  ${
								expandedItems[content.id] ? s.arrowIconRotated : ''
							}`}
							onClick={() => handleExpandClick(content.id)}
						/>
					</Flex>
					<div
						className={`${s.expandedContent} ${
							expandedItems[content.id] ? s.expandedContentVisible : ''
						}`}>
						{parse(content.content)}
					</div>
				</div>
			))}
			<Spacing margin="25px" />
			<Link
				href={
					selectedMenu === 'FAQS'
						? '/customer-service?announce=faqs'
						: '/customer-service?announce=notice'
				}>
				<Flex justify="center" align="center">
					<Button color={vars.color.darkGray} className={s.moreButton}>
						더보기 +
					</Button>
				</Flex>
			</Link>
		</div>
	);
};

export default HomeAnnouncementsBoard;
