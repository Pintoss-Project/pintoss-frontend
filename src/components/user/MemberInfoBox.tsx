'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './MyPageStyle.css';

import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import { Divider, Flex } from '@/shared/components/layout';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/shared/components/spinner/Spinner';

const MemberInfoBox = () => {
	const { data: userInfo, isLoading } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchUserInfo,
	});

	if (isLoading) return <Spinner />;

	return (
		<Flex direction="column" justify="space-around" className={s.memberInfoInnerBox}>
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이름</span>
				<span className={s.darkerGrayText}>{userInfo?.name}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>휴대폰</span>
				<span className={s.darkerGrayText}>{userInfo?.phone}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이메일</span>
				<span className={s.darkerGrayText}>{userInfo?.email}</span>
			</Flex>
		</Flex>
	);
};

export default MemberInfoBox;
