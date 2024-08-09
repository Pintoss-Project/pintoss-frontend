'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { Input } from '@/shared/components/input';
import AdminUserList from './AdminUserList';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserList } from '@/app/api/user/getUserList';

const AdminUserMain = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [pageSize] = useState(10);

	const { data: paginatedUsers, refetch: refetchFilteredUsers } = useQuery({
		queryKey: ['userList', { startDate, endDate, search, page, pageSize }],
		queryFn: () => getUserList({ startDate, endDate, search, page, pageSize }),
	});

	const handleSearch = () => {
		refetchFilteredUsers();
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div>
			<div className={s.userSearchBox} style={{ minWidth: '700px' }}>
				<Flex align="center" style={{ width: '650px' }}>
					<div style={{ width: '100%' }}>
						<Flex align="center">
							<div className={s.darkGraySmallText} style={{ marginRight: '30px' }}>
								가입일
							</div>
							<Input
								className={s.lighterGrayInput}
								style={{ width: '200px', height: '25px', marginRight: '13px' }}
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								type="date"
							/>
							<div>~</div>
							<Input
								className={s.lighterGrayInput}
								style={{ width: '200px', height: '25px', marginLeft: '13px' }}
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								type="date"
							/>
						</Flex>
						<Spacing margin="13px" />
						<Flex align="center">
							<div className={s.darkGraySmallText} style={{ marginRight: '30px' }}>
								검색어
							</div>
							<Input
								className={s.lighterGrayInput}
								style={{ width: '435px', height: '25px' }}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Flex>
					</div>
					<Button
						color={vars.color.black}
						style={{ marginLeft: '15px', fontSize: '16px' }}
						onClick={handleSearch}>
						<Flex justify="center" align="center" className={s.userSearchButton}>
							검색
						</Flex>
					</Button>
				</Flex>
			</div>
			<Spacing margin="30px" />
			<AdminUserList
				users={paginatedUsers?.data.content}
				totalPages={paginatedUsers?.data.totalPages}
				currentPage={page}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default AdminUserMain;
