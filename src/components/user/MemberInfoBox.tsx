'use client';

import { vars } from '@/shared/styles/theme.css';
import * as s from './MyPageStyle.css';

import { Divider, Flex } from '@/shared/components/layout';
import Spinner from '@/shared/components/spinner/Spinner';
import { useAuth } from '@/contexts/AuthContext';

const MemberInfoBox = () => {
	const { user, loading } = useAuth();

	if (loading) return <Spinner />;

	return (
		<Flex direction="column" justify="space-around" className={s.memberInfoInnerBox}>
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이름</span>
				<span className={s.darkerGrayText}>{user?.name}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>휴대폰</span>
				<span className={s.darkerGrayText}>{user?.phone}</span>
			</Flex>
			<Divider color={vars.color.paleGray} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이메일</span>
				<span className={s.darkerGrayText}>{user?.email}</span>
			</Flex>
		</Flex>
	);
};

export default MemberInfoBox;
