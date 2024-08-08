'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';
import { Input } from '@/shared/components/input';
import AdminUserList from './AdminUserList';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserList } from '@/app/api/user/getUserList';
import { getFilteredUserList } from '@/app/api/user/getFilteredUserList';

const AdminUserMain = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [search, setSearch] = useState('');
	const [filterParams, setFilterParams] = useState<{
		startDate?: string;
		endDate?: string;
		search?: string;
	}>({});

	const { data: userList } = useQuery({
		queryKey: ['users'],
		queryFn: getUserList,
	});

	const { data: filteredUsers, refetch: refetchFilteredUsers } = useQuery({
		queryKey: ['filteredUsers', filterParams],
		queryFn: () => getFilteredUserList(filterParams),
		enabled: false,
	});

	const handleSearch = () => {
		const params: { startDate?: string; endDate?: string; search?: string } = {};
		if (startDate) params.startDate = startDate;
		if (endDate) params.endDate = endDate;
		if (search) params.search = search;

		setFilterParams(params);
		refetchFilteredUsers();
	};

	useEffect(() => {
		if (filterParams) {
			refetchFilteredUsers();
		}
	}, [filterParams, refetchFilteredUsers]);

	const displayedUsers = filteredUsers?.data ?? userList?.data;

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
			<AdminUserList users={displayedUsers} />
		</div>
	);
};

export default AdminUserMain;
