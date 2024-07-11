'use client';

import { Button } from '@/shared/components/button';
import * as s from './AdminStyle.css';
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

interface Props {
	type: string;
}

interface Board {
	board_id: number;
	title: string;
	writer: string;
	write_date: string;
}

const AdminBoardList = ({ type }: Props) => {
	const [boards, setBoards] = useState<Board[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [boardsPerPage] = useState<number>(10);
	const [currentPageGroup, setCurrentPageGroup] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/json/${type === 'notice' ? 'notice' : 'faqs'}.json`);
			const data = await response.json();
			setBoards(data);
		};

		fetchData();
	}, []);

	const handleClickPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handlePageGroupChange = (direction: 'prev' | 'next' | 'first' | 'last') => {
		const totalGroups = Math.ceil(Math.ceil(boards.length / boardsPerPage) / 10);
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

	const totalPages = Math.ceil(boards.length / boardsPerPage);
	const displayedBoards = boards.slice(
		(currentPage - 1) * boardsPerPage,
		currentPage * boardsPerPage,
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

	if (type === '') return null;
	return (
		<div>
			<Spacing margin="30px" />
			<Flex align="center">
				<span>총 </span>
				<span>{boards.length}</span>
				<span>건의 공지사항</span>
			</Flex>
			<Spacing margin="10px" />
			<div style={{ height: '100%', border: `1px solid ${vars.color['lighter-gray']}` }}>
				<Flex
					justify="center"
					align="center"
					style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}>
					<div className={clsx(s.boardFlexItem1, s.darkGraySmallText)}>번호</div>
					<div className={clsx(s.boardFlexItem2, s.darkGraySmallText)}>제목</div>
					<div className={clsx(s.boardFlexItem3, s.darkGraySmallText)}>작성자</div>
					<div className={clsx(s.boardFlexItem4, s.darkGraySmallText)}>작성일</div>
					<div className={clsx(s.boardFlexItem5, s.darkGraySmallText)}>관리</div>
				</Flex>
				{displayedBoards.map((board, index) => (
					<Flex
						justify="center"
						align="center"
						style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color['lighter-gray']}` }}
						key={board.board_id}>
						<div className={clsx(s.boardFlexItem1, s.darkGraySmallText)}>
							{(currentPage - 1) * boardsPerPage + index + 1}
						</div>
						<div className={clsx(s.boardFlexItem2, s.darkGraySmallText)}>{board.title}</div>
						<div className={clsx(s.boardFlexItem3, s.darkGraySmallText)}>{board.writer}</div>
						<div className={clsx(s.boardFlexItem4, s.darkGraySmallText)}>{board.write_date}</div>
						<div className={clsx(s.boardFlexItem5, s.darkGraySmallText)}>
							<Flex justify="center" align="center">
								<Button
									color={vars.color['dark-gray']}
									style={{
										padding: '3px 8px',
										marginRight: '10px',
										backgroundColor: vars.color.white,
										border: `1px solid ${vars.color['lighter-gray']}`,
										borderRadius: '5px',
									}}>
									수정
								</Button>
								<Button
									color={vars.color['dark-gray']}
									style={{
										padding: '3px 8px',
										backgroundColor: vars.color.white,
										border: `1px solid ${vars.color['lighter-gray']}`,
										borderRadius: '5px',
									}}>
									삭제
								</Button>
							</Flex>
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

export default AdminBoardList;
