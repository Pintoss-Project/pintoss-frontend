'use client';

import { Input } from '@/shared/components/input';
import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import {
	MdKeyboardDoubleArrowRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardArrowLeft,
} from 'react-icons/md';
import { ManageUserInfo } from '@/models/user';
import { formatDate } from '@/utils/formatDate';

interface AdminUserListProps {
	users: ManageUserInfo[] | undefined;
	totalPages?: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const AdminUserList = ({
	users: initialUsers = [],
	totalPages = 1,
	currentPage,
	onPageChange,
}: AdminUserListProps) => {
	const [users, setUsers] = useState<ManageUserInfo[]>(initialUsers);
	const [selectedCount, setSelectedCount] = useState<number>(0);

	useEffect(() => {
		setUsers(initialUsers);
		setSelectedCount(initialUsers.filter((user) => user.selected).length || 0);
	}, [initialUsers]);

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

	const getPageNumbers = () => {
		const pages = [];
		for (let i = 0; i < totalPages; i++) {
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
						{users?.length}
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
				{users?.map((user, index) => (
					<Flex
						justify="center"
						align="center"
						style={{ padding: '13px 0', borderBottom: `1px solid ${vars.color.lighterGray}` }}
						key={user.email}>
						<div className={s.userFlexItem1}>
							<Input
								type="checkbox"
								className={clsx(s.checkbox)}
								checked={user.selected || false}
								onChange={() => handleSelectUser(index)}
							/>
						</div>
						<div className={clsx(s.userFlexItem2, s.darkGraySmallText)}>
							{currentPage * (users?.length ?? 0) + index + 1}
						</div>
						<div className={clsx(s.userFlexItem3, s.darkGraySmallText)}>{user.email}</div>
						<div className={clsx(s.userFlexItem4, s.darkGraySmallText)}>
							{user.timestamp ? formatDate(user.timestamp) : 'N/A'}
						</div>
						<div className={clsx(s.userFlexItem5, s.darkGraySmallText)}>{user.inflow}</div>
						<div className={clsx(s.userFlexItem6, s.darkGraySmallText)}>{user.phone}</div>
						<div className={clsx(s.userFlexItem7, s.darkGraySmallText)}>{user.sns}</div>
					</Flex>
				))}
			</div>
			<Spacing margin="30px" />
			<Flex justify="center" className={s.paginationBox} style={{ padding: '30px 0' }}>
				<button className={s.pageButton} onClick={() => onPageChange(0)}>
					<MdKeyboardDoubleArrowLeft />
				</button>
				<button className={s.pageButton} onClick={() => onPageChange(Math.max(0, currentPage - 1))}>
					<MdKeyboardArrowLeft />
				</button>
				{getPageNumbers().map((pageNumber) => (
					<button
						key={pageNumber}
						className={clsx(s.pageButton, { [s.activePageButton]: currentPage === pageNumber })}
						onClick={() => onPageChange(pageNumber)}>
						{pageNumber + 1}
					</button>
				))}
				<button
					className={s.pageButton}
					onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}>
					<MdKeyboardArrowRight />
				</button>
				<button className={s.pageButton} onClick={() => onPageChange(totalPages - 1)}>
					<MdKeyboardDoubleArrowRight />
				</button>
			</Flex>
		</div>
	);
};

export default AdminUserList;
