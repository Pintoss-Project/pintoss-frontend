'use client';

import * as hs from '@/components/home/HomeStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import clsx from 'clsx';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import * as s from './CustomerStyle.css';

const addInformation =
	'안녕하세요 상품권 전문 매입회사 핀토스 입니다. 수수료 단가 공지안내드립니다.\n기존과 동일하며 은행점검시간 00시부터00:30분사이에는 입금이 지연될수 있으니 참고 부탁드립니다.\n■ 상품권 매입가(수수료) 안내\n- 컬쳐랜드 문화상품권 : 89% (수수료 11%)\n- 컬쳐랜드 교환권 : 89% (수수료 11%)\n- 해피머니 문화상품권 : 89% (수수료 11%)\n- 해피머니 교환권 : 89% (수수료 11%)\n- 구글기프트 카톡 교환권 : 89% (수수료 11%)\n- 북앤라이프 도서 문화상품권 : 89% (수수료 11%)\n- 북앤라이프 교환권 : 89% (수수료 11%)\n■ 카톡&문자 거래 \n- 롯데모바일상품권 카톡 ﻿교환권 92%(수수료 8%) 이체수수료X\n■ 등기거래\n- 롯데&신세계&현대지류상품권 : 92%(수수료 8%) (롯데&신세계&현대 지류상품권은 우체국 등기거래만 가능합니다)\n※ 카톡&문자&등기거래 문의는 AM09~AM01 고객센터 운영시간에만 가능합니다.  \n※ 상품권 매입 수수료는 시장 상황에 따라 변동될 수 있습니다. \n※ 문화상품권현금 교환 은 거래신청 후 환불 및 취소가 불가능합니다.\n항상 저희 핀토스를 애용해주셔서 감사합니다\n';

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

const CustomerMain = () => {
	const [selectedMenu, setSelectedMenu] = useState<string>('announcement');
	const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

	const [announcementPage, setAnnouncementPage] = useState<number>(1);
	const [faqsPage, setFaqsPage] = useState<number>(1);
	const itemsPerPage = 10;

	const handleMenuClick = (id: string) => {
		setSelectedMenu(id);
	};

	const handleExpandClick = (id: number) => {
		setExpandedItems((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const renderContent = (contentList: typeof ANNOUNCEMENTS | typeof FAQS, currentPage: number) => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return contentList.slice(startIndex, endIndex).map((content) => (
			<div key={content.id}>
				<Flex justify="center" align="center" className={hs.announceContent}>
					<div className={hs.flexItem1}>
						<Flex justify="center" align="center" className={hs.announceTag}>
							{content.tag}
						</Flex>
					</div>
					<span className={hs.announceContentText}>{content.content}</span>
					<span className={hs.announceDate}>{content.date}</span>
					<IoIosArrowDown
						className={`${hs.announceArrowIcon} ${
							expandedItems[content.id] ? s.arrowIconRotated : ''
						}`}
						onClick={() => handleExpandClick(content.id)}
					/>
				</Flex>
				<div
					className={`${s.expandedContent} ${
						expandedItems[content.id] ? s.expandedContentVisible : ''
					}`}>
					<div
						dangerouslySetInnerHTML={{
							__html: addInformation.replace(/\n/g, '<br /><br />'),
						}}></div>
				</div>
			</div>
		));
	};

	const totalAnnouncementPages = Math.ceil(ANNOUNCEMENTS.length / itemsPerPage);
	const totalFaqsPages = Math.ceil(FAQS.length / itemsPerPage);

	const getPageNumbers = (totalPages: number) => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	const handlePageClick = (pageNumber: number) => {
		if (selectedMenu === 'announcement') {
			setAnnouncementPage(pageNumber);
		} else if (selectedMenu === 'FAQs') {
			setFaqsPage(pageNumber);
		}
	};

	const handlePageGroupChange = (direction: 'first' | 'prev' | 'next' | 'last') => {
		const totalAnnouncementGroups = Math.ceil(totalAnnouncementPages / 10);
		const totalFaqsGroups = Math.ceil(totalFaqsPages / 10);

		if (selectedMenu === 'announcement') {
			const currentGroup = Math.ceil(announcementPage / 10);
			if (direction === 'first') {
				setAnnouncementPage(1);
			} else if (direction === 'prev' && currentGroup > 1) {
				setAnnouncementPage((currentGroup - 2) * 10 + 1);
			} else if (direction === 'next' && currentGroup < totalAnnouncementGroups) {
				setAnnouncementPage(currentGroup * 10 + 1);
			} else if (direction === 'last') {
				setAnnouncementPage((totalAnnouncementGroups - 1) * 10 + 1);
			}
		} else if (selectedMenu === 'FAQs') {
			const currentGroup = Math.ceil(faqsPage / 10);
			if (direction === 'first') {
				setFaqsPage(1);
			} else if (direction === 'prev' && currentGroup > 1) {
				setFaqsPage((currentGroup - 2) * 10 + 1);
			} else if (direction === 'next' && currentGroup < totalFaqsGroups) {
				setFaqsPage(currentGroup * 10 + 1);
			} else if (direction === 'last') {
				setFaqsPage((totalFaqsGroups - 1) * 10 + 1);
			}
		}
	};

	return (
		<div className={hs.homeAnnouncementsBoard}>
			<Flex>
				{ANNOUNCEMENTS_MENU.map((menu) => (
					<span
						key={menu.id}
						id={menu.id}
						className={`${hs.filterMenu} ${selectedMenu === menu.id ? 'selected' : ''}`}
						onClick={() => handleMenuClick(menu.id)}>
						{menu.name}
					</span>
				))}
			</Flex>
			<Spacing margin="20px" />
			<Flex justify="center" align="center" className={hs.announceMenuBox}>
				<span className={hs.flexItem1}></span>
				<span className={hs.flexItem2}>제목</span>
				<span className={hs.flexItem3}>작성일</span>
				<span className={hs.flexItem4}></span>
			</Flex>
			{selectedMenu === 'announcement' && renderContent(ANNOUNCEMENTS, announcementPage)}
			{selectedMenu === 'FAQs' && renderContent(FAQS, faqsPage)}

			<Spacing margin="20px" />
			<Flex justify="center" className={s.paginationBox} style={{ padding: '20px 0' }}>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('first')}>
					<MdKeyboardDoubleArrowLeft />
				</button>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('prev')}>
					<MdKeyboardArrowLeft />
				</button>
				{selectedMenu === 'announcement' &&
					getPageNumbers(totalAnnouncementPages).map((pageNumber) => (
						<button
							key={pageNumber}
							className={clsx(s.pageButton, {
								[s.activePageButton]: announcementPage === pageNumber,
							})}
							onClick={() => handlePageClick(pageNumber)}>
							{pageNumber}
						</button>
					))}
				{selectedMenu === 'FAQs' &&
					getPageNumbers(totalFaqsPages).map((pageNumber) => (
						<button
							key={pageNumber}
							className={clsx(s.pageButton, { [s.activePageButton]: faqsPage === pageNumber })}
							onClick={() => handlePageClick(pageNumber)}>
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

export default CustomerMain;
