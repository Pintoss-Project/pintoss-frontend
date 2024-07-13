'use client';

import { Input } from '@/shared/components/input';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface User {
	user_id: string;
	join_date: string;
	inflow: string;
	phone: string;
	sns: string;
	selected?: boolean;
}

const AdminUserList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedCount, setSelectedCount] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [usersPerPage] = useState<number>(10);
	const [currentPageGroup, setCurrentPageGroup] = useState<number>(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/json/user.json');
			const data = await response.json();
			setUsers(data);
		};

		fetchData();
	}, []);

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		const updatedUsers = users.map((user) => ({ ...user, selected: checked }));
		setUsers(updatedUsers);
		setSelectedCount(checked ? updatedUsers.length : 0);
	};

	const handleSelectUser = (index: number) => {
		const updatedUsers = [...users];
		updatedUsers[index].selected = !updatedUsers[index].selected;
		setUsers(updatedUsers);
		setSelectedCount(updatedUsers.filter((user) => user.selected).length);
	};

	const handleClickPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handlePageGroupChange = (direction: 'prev' | 'next' | 'first' | 'last') => {
		const totalGroups = Math.ceil(Math.ceil(users.length / usersPerPage) / 10);
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

	const totalPages = Math.ceil(users.length / usersPerPage);
	const displayedUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

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
			<Flex justify="space-between">
				<div>
					<span className={s.darkGraySmallText}>선택회원</span>
					<span className={s.blackSmallText} style={{ fontWeight: 'bold' }}>
						{selectedCount}
					</span>
					<span className={s.darkGraySmallText}>명</span>
				</div>
				<div>
					<span className={s.darkGraySmallText}>검색결과 / </span>
					<span className={s.blackSmallText} style={{ fontWeight: 'bold' }}>
						{users.length}
					</span>
					<span className={s.darkGraySmallText}>명 검색결과</span>
				</div>
			</Flex>
			<Spacing margin="10px" />
			<div style={{ height: '100%', border: `1px solid ${vars.color.lighterGray}` }}>
				<Flex
					justify="center"
					align="center"
					style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}>
					<div className={s.userFlexItem1}>
						<Input
							name="all"
							type="checkbox"
							className={clsx(s.checkbox)}
							onChange={handleSelectAll}
						/>
					</div>
					<div className={clsx(s.userFlexItem2, s.darkGraySmallText)}>번호</div>
					<div className={clsx(s.userFlexItem3, s.darkGraySmallText)}>아이디</div>
					<div className={clsx(s.userFlexItem4, s.darkGraySmallText)}>가입일</div>
					<div className={clsx(s.userFlexItem5, s.darkGraySmallText)}>유입경로</div>
					<div className={clsx(s.userFlexItem6, s.darkGraySmallText)}>휴대폰</div>
					<div className={clsx(s.userFlexItem7, s.darkGraySmallText)}>소셜로그인</div>
				</Flex>
				{displayedUsers.map((user, index) => (
					<Flex
						justify="center"
						align="center"
						style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}
						key={user.user_id}>
						<div className={s.userFlexItem1}>
							<Input
								type="checkbox"
								className={clsx(s.checkbox)}
								checked={user.selected || false}
								onChange={() => handleSelectUser((currentPage - 1) * usersPerPage + index)}
							/>
						</div>
						<div className={clsx(s.userFlexItem2, s.darkGraySmallText)}>
							{(currentPage - 1) * usersPerPage + index + 1}
						</div>
						<div className={clsx(s.userFlexItem3, s.darkGraySmallText)}>{user.user_id}</div>
						<div className={clsx(s.userFlexItem4, s.darkGraySmallText)}>{user.join_date}</div>
						<div className={clsx(s.userFlexItem5, s.darkGraySmallText)}>{user.inflow}</div>
						<div className={clsx(s.userFlexItem6, s.darkGraySmallText)}>{user.phone}</div>
						<div className={clsx(s.userFlexItem7, s.darkGraySmallText)}>{user.sns}</div>
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

export default AdminUserList;
