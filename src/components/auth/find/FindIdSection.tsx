'use client';

import * as s from '@/components/auth/AuthStyle.css';
import { Flex } from '@/shared/components/layout';
import AuthSection from '../AuthSection';
import AuthHeader from '../AuthHeader';
import FindIdMain from './FindIdMain';

const FindIdSection = () => {
	return (
		<Flex justify="center" className={s.container} style={{ minHeight: '700px' }}>
			<AuthSection
				header={<AuthHeader title="아이디 찾기" />}
				main={<FindIdMain />}
				marginTop="100px"
			/>
		</Flex>
	);
};

export default FindIdSection;
