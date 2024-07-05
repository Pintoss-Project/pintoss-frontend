import { Flex } from '@/shared/components/layout';
import * as s from './PageStyle.css';

import { ReactNode } from 'react';

interface Props {
	header: string;
	main: ReactNode;
}

const PageSection = ({ header, main }: Props) => {
	return (
		<Flex className={s.sectionStyle} direction="column" align="center">
			<header className={s.pageHeader}>{header}</header>
			<main style={{ width: '100%' }}>{main}</main>
		</Flex>
	);
};

export default PageSection;
