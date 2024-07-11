import * as s from './MyPageStyle.css';

import AuthenticationBox from './AuthenticationBox';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import Image from 'next/image';
import { KakaoLogo } from '../../../public/svgs';
import { vars } from '@/shared/styles/theme.css';
import { Flex } from '@/shared/components/layout';

const AuthenticationInfoBox = () => {
	return (
		<div>
			<AuthenticationBox />
			<Spacing margin="40px" />
			<Button color={vars.color['dark-gray']} className={s.whiteButton}>
				<Flex justify="center" align="center">
					<Image src={KakaoLogo} alt="카카오 로고 이미지" width={24} height={20} />
					<span style={{ fontSize: '20px', marginLeft: '10px' }}>카카오톡 바로가기</span>
				</Flex>
			</Button>
		</div>
	);
};

export default AuthenticationInfoBox;
