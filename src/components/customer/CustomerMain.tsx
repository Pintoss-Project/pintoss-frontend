'use client';

import { fetchBoardList } from '@/app/api/board/fetchBoardList';
import * as hs from '@/components/home/HomeStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { formatDate } from '@/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import {
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import * as s from './CustomerStyle.css';

const ANNOUNCEMENTS_MENU = [
	{ id: 'NOTICE', name: '공지사항' },
	{ id: 'FAQS', name: '자주 묻는 질문' },
];

const CustomerMain = () => {
	const searchParams = useSearchParams();
	const [selectedMenu, setSelectedMenu] = useState<string>(searchParams.get('type') || 'NOTICE');
	const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 10;

	const { data: boards, isLoading } = useQuery({
		queryKey: ['boardList', selectedMenu],
		queryFn: () => fetchBoardList(selectedMenu),
	});

	const handleMenuClick = (id: string) => {
		setSelectedMenu(id);
		setCurrentPage(1);
	};

	const handleExpandClick = (id: number) => {
		setExpandedItems((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const renderContent = () => {
		if (isLoading) return <div>Loading...</div>;
		if (!boards?.data || boards?.data.length === 0) return <div>No content available</div>;

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedBoards = boards?.data.slice(startIndex, endIndex);

		return paginatedBoards.map((content) => (
			<div key={content.id}>
				<Flex justify="center" align="center" className={hs.announceContent}>
					<div className={hs.flexItem1}>
						<Flex justify="center" align="center" className={hs.announceTag}>
							{content.type === 'NOTICE' ? '알림' : '질문'}
						</Flex>
					</div>
					<span className={hs.announceContentText}>{content.title}</span>
					<span className={hs.announceDate}>{formatDate(content.createdAt as string)}</span>
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
							__html: content.content.replace(/\n/g, '<br /><br />'),
						}}></div>
				</div>
			</div>
		));
	};

	const totalPages = Math.ceil((boards?.data?.length || 0) / itemsPerPage);

	const getPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handlePageGroupChange = (direction: 'first' | 'prev' | 'next' | 'last') => {
		const currentGroup = Math.ceil(currentPage / 10);

		if (direction === 'first') {
			setCurrentPage(1);
		} else if (direction === 'prev' && currentGroup > 1) {
			setCurrentPage((currentGroup - 2) * 10 + 1);
		} else if (direction === 'next' && currentGroup < Math.ceil(totalPages / 10)) {
			setCurrentPage(currentGroup * 10 + 1);
		} else if (direction === 'last') {
			setCurrentPage((Math.ceil(totalPages / 10) - 1) * 10 + 1);
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
			{renderContent()}
			<Spacing margin="20px" />
			<Flex justify="center" className={s.paginationBox} style={{ padding: '20px 0' }}>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('first')}>
					<MdKeyboardDoubleArrowLeft />
				</button>
				<button className={s.pageButton} onClick={() => handlePageGroupChange('prev')}>
					<MdKeyboardArrowLeft />
				</button>
				{getPageNumbers().map((pageNumber) => (
					<button
						key={pageNumber}
						className={clsx(s.pageButton, {
							[s.activePageButton]: currentPage === pageNumber,
						})}
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
