import * as s from './AuthStyle.css';

import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';

import { ReactNode } from 'react';

interface Props {
	header: ReactNode;
	main: ReactNode;
	marginTop?: string;
}

const AuthSection = ({ header, main, marginTop }: Props) => {
	return (
		<Flex className={s.sectionStyle} direction="column" align="center">
			<section className={s.innerWrap} style={{ height: '100%' }}>
				<Spacing margin={marginTop} />
				<header>{header}</header>
				<main className={s.mainWrap}>{main}</main>
			</section>
		</Flex>
	);
};

export default AuthSection;
