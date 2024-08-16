'use client';

import { Flex } from '@/shared/components/layout';
import * as s from './PageStyle.css';

import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import authState from '@/recoil/authAtom';

interface Props {
	header: string;
	main: ReactNode;
}

const PageSection = ({ header, main }: Props) => {
	const authStateValue = useRecoilValue(authState);
	const { isLoggedIn } = authStateValue;

	if (!isLoggedIn) return null;

	return (
		<Flex className={s.sectionStyle} direction="column" align="center">
			<header className={s.pageHeader}>{header}</header>
			<main style={{ width: '100%' }}>{main}</main>
		</Flex>
	);
};

export default PageSection;
