import { Flex } from '@/shared/components/layout';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import * as s from './MyPageStyle.css';

import { Button } from '@/shared/components/button';
import Spacing from '@/shared/components/layout/Spacing';
import Image from 'next/image';
import { KakaoLogo, NaverLogo } from '../../../public/svgs';
import { API_HOST_URL } from '@/utils/fetchServer';

const SnsInfoBox = () => {
	const handleNaverConnect = () => {
		window.location.href = `${API_HOST_URL}/api/oauth/naver/connect`;
	};

	return (
		<Flex justify="center" align="center" style={{ width: '100%' }}>
			<div style={{ width: '100%', marginTop: '12px' }}>
				<Flex align="center" className={cs.naverButtonBox} onClick={handleNaverConnect}>
					<Image
						src={NaverLogo}
						alt="네이버 로고 이미지"
						width={20}
						height={20}
						className={cs.snsLogoStyle}
					/>
					<Button color={vars.color.white} className={cs.naverButtonStyle}>
						네이버 계정 연동하기
					</Button>
					<Flex justify="center" align="center" className={s.snsButtonCheckBox}>
						✓
					</Flex>
				</Flex>
				<Spacing margin="10px" />
				<Flex align="center" className={cs.kakaoButtonBox}>
					<Image
						src={KakaoLogo}
						alt="카카오 로고 이미지"
						width={24}
						height={20}
						className={cs.snsLogoStyle}
					/>
					<Button color={vars.color.black} className={cs.kakaoButtonStyle}>
						카카오 계정 연동하기
					</Button>
					<Flex justify="center" align="center" className={s.snsButtonCheckBox}>
						✓
					</Flex>
				</Flex>
			</div>
		</Flex>
	);
};

export default SnsInfoBox;
