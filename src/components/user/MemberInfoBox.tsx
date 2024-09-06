'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './MyPageStyle.css';

import { fetchUserInfo } from '@/app/api/user/fetchUserInfo';
import { Divider, Flex } from '@/shared/components/layout';
import { useQuery } from '@tanstack/react-query';

const MemberInfoBox = () => {
	const { data: userInfo } = useQuery({
		queryKey: ['userInfo'],
		queryFn: fetchUserInfo,
	});

	return (
		<Flex direction="column" justify="space-around" className={s.memberInfoInnerBox}>
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이름</span>
				<span className={s.darkerGrayText}>{userInfo?.data.name}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>휴대폰</span>
				<span className={s.darkerGrayText}>{userInfo?.data.phone}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이메일</span>
				<span className={s.darkerGrayText}>{userInfo?.data.email}</span>
			</Flex>
		</Flex>
	);
};

export default MemberInfoBox;
