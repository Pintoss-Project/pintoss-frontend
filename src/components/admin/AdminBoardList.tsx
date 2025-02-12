'use client';

import { fetchBoardList } from '@/controllers/board/fetchBoardList';
import { fetchDeleteBoard } from '@/controllers/board/fetchDeleteBoard';
import { deleteImageFromCloudinary } from '@/controllers/image/deleteImageFromCloudinary';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import { formatDate } from '@/utils/formatDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import {
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import * as s from './AdminStyle.css';

interface Props {
	type: string;
	onEdit: (board: { id: number; title: string; content: string; images?: string[] }) => void;
	onDelete: () => void;
}

const AdminBoardList = ({ type, onEdit, onDelete }: Props) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [boardsPerPage] = useState<number>(10);
	const [currentPageGroup, setCurrentPageGroup] = useState<number>(1);

	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: boards } = useQuery({
		queryKey: ['boardList', type],
		queryFn: () => fetchBoardList(type.toUpperCase()),
	});

	const handleClickPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const boardsLength = boards?.data.length as number;

	const handlePageGroupChange = (direction: 'prev' | 'next' | 'first' | 'last') => {
		const totalGroups = Math.ceil(Math.ceil(boardsLength / boardsPerPage) / 10);
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

	const totalPages = Math.ceil(boardsLength / boardsPerPage);
	const displayedBoards = boards?.data.slice(
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

	const deleteMutation = useMutation({
		mutationFn: async (id: number) => {
			const boardToDelete = displayedBoards?.find((board) => board.id === id);

			if (boardToDelete?.images) {
				for (const image of boardToDelete.images) {
					try {
						await deleteImageFromCloudinary(image);
					} catch (error) {
						console.error('Failed to delete image:', error);
					}
				}
			}

			await fetchDeleteBoard(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boardList', type] });
			onDelete();
		},
	});

	const handleDelete = (id: number) => {
		open({
			width: '300px',
			height: '200px',
			title: `${type === 'notice' ? '공지사항' : '자주 묻는 질문'} 삭제`,
			main: (
				<AlertMainTextBox
					text={`${type === 'notice' ? '공지사항' : '자주 묻는 질문'}을 삭제하시겠습니까?`}
				/>
			),
			leftButtonLabel: '취소',
			rightButtonLabel: '확인',
			leftButtonStyle: cs.whiteAndBlackButton,
			rightButtonStyle: cs.lightBlueButton,
			onRightButtonClick: () => {
				deleteMutation.mutate(id);
				close();
			},
			onLeftButtonClick: close,
		});
	};

	const handleEdit = (board: { id: number; title: string; content: string; images?: string[] }) => {
		onEdit(board);
	};

	return (
		<div>
			<Spacing margin="30px" />
			<Flex align="center">
				<span>총 </span>
				<span>{boardsLength}</span>
				<span>건의 공지사항</span>
			</Flex>
			<Spacing margin="10px" />
			<div style={{ height: '100%', border: `1px solid ${vars.color.lighterGray}` }}>
				<Flex
					justify="center"
					align="center"
					style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<div className={clsx(s.boardFlexItem1, s.darkGraySmallText)}>번호</div>
					<div className={clsx(s.boardFlexItem2, s.darkGraySmallText)}>제목</div>
					<div className={clsx(s.boardFlexItem3, s.darkGraySmallText)}>작성자</div>
					<div className={clsx(s.boardFlexItem4, s.darkGraySmallText)}>작성일</div>
					<div className={clsx(s.boardFlexItem5, s.darkGraySmallText)}>관리</div>
				</Flex>
				{displayedBoards?.map((board, index) => (
					<Flex
						justify="center"
						align="center"
						style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}
						key={board.id}>
						<div className={clsx(s.boardFlexItem1, s.darkGraySmallText)}>
							{(currentPage - 1) * boardsPerPage + index + 1}
						</div>
						<div className={clsx(s.boardFlexItem2, s.darkGraySmallText)}>{board.title}</div>
						<div className={clsx(s.boardFlexItem3, s.darkGraySmallText)}>{board.writer}</div>
						<div className={clsx(s.boardFlexItem4, s.darkGraySmallText)}>
							{formatDate(board.createdAt as string)}
						</div>
						<div className={clsx(s.boardFlexItem5, s.darkGraySmallText)}>
							<Flex justify="center" align="center">
								<Button
									color={vars.color.darkGray}
									style={{
										padding: '3px 8px',
										marginRight: '10px',
										backgroundColor: vars.color.white,
										border: `1px solid ${vars.color.lighterGray}`,
										borderRadius: '5px',
									}}
									onClick={() =>
										handleEdit({
											id: board.id,
											title: board.title,
											content: board.content,
											images: board.images,
										})
									}>
									수정
								</Button>
								<Button
									color={vars.color.darkGray}
									style={{
										padding: '3px 8px',
										backgroundColor: vars.color.white,
										border: `1px solid ${vars.color.lighterGray}`,
										borderRadius: '5px',
									}}
									onClick={() => handleDelete(board.id)}>
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
