import * as s from './AuthStyle.css';

import { Flex } from '@/shared/components/layout';

import { ReactNode } from 'react';

interface Props {
	header: ReactNode;
	main: ReactNode;
	footer: ReactNode;
}

const AuthSection = ({ header, main, footer }: Props) => {
	return (
		<Flex className={s.sectionStyle} direction="column" align="center">
			<section className={s.innerWrap} style={{ height: '100%' }}>
				<header>{header}</header>
				<main className={s.mainWrap}>{main}</main>
				<footer className={s.footerWrap}>{footer}</footer>
			</section>
		</Flex>
	);
};

export default AuthSection;
