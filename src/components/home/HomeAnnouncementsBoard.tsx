'use client';

import { IoIosArrowDown } from 'react-icons/io';
import { Flex } from '@/shared/components/layout';
import * as s from './HomeStyle.css';
import { useState } from 'react';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import Link from 'next/link';

const ANNOUNCEMENTS_MENU = [
	{ id: 'announcement', name: '공지사항' },
	{ id: 'FAQs', name: '자주 묻는 질문' },
];

const ANNOUNCEMENTS = [
	{ id: 1, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
	{ id: 2, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
	{ id: 3, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
	{ id: 4, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
	{ id: 5, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
	{ id: 6, tag: '알림', content: '[이벤트] 별풍선, 1000개 이벤트 안내', date: '2024-06-13' },
];

const FAQS = [
	{ id: 1, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
	{ id: 2, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
	{ id: 3, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
	{ id: 4, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
	{ id: 5, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
	{ id: 6, tag: '질문', content: '자주 묻는 질문', date: '2024-07-13' },
];

const HomeAnnouncementsBoard = () => {
	const [selectedMenu, setSelectedMenu] = useState<string>('announcement');

	const handleMenuClick = (id: string) => {
		setSelectedMenu(id);
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
			{selectedMenu === 'announcement' &&
				ANNOUNCEMENTS.map((content) => (
					<Flex justify="center" align="center" className={s.announceContent} key={content.id}>
						<div className={s.flexItem1}>
							<Flex justify="center" align="center" className={s.announceTag}>
								{content.tag}
							</Flex>
						</div>
						<span className={s.announceContentText}>{content.content}</span>
						<span className={s.announceDate}>{content.date}</span>
						<IoIosArrowDown className={s.announceArrowIcon} />
					</Flex>
				))}
			{selectedMenu === 'FAQs' &&
				FAQS.map((content) => (
					<Flex justify="center" align="center" className={s.announceContent} key={content.id}>
						<div className={s.flexItem1}>
							<Flex justify="center" align="center" className={s.announceTag}>
								{content.tag}
							</Flex>
						</div>
						<span className={s.announceContentText}>{content.content}</span>
						<span className={s.announceDate}>{content.date}</span>
						<IoIosArrowDown className={s.announceArrowIcon} />
					</Flex>
				))}
			<Spacing margin="25px" />
			<Link
				href={
					selectedMenu === 'FAQs'
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
