'use client';

import * as cs from '@/shared/styles/common.css';
import * as s from './LoginStyle.css';

import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import Image from 'next/image';
import { KakaoLogo, NaverLogo } from '../../../../public/svgs';

const LoginButtons = () => {
	const handleNaverLogin = () => {
		window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
	};

	const handleKakaoLogin = () => {
		window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
	};

	return (
		<div>
			<Button
				form="login-form"
				color={vars.color.white}
				className={cs.lightBlueButton}
				style={{ fontSize: '18px', height: '56px' }}
				type="submit">
				로그인
			</Button>
			<Spacing margin="25px" />
			<Flex justify="center" align="center">
				<div className={s.loginDivider} />
				<span className={s.grayText} style={{ margin: '0px 10px' }}>
					또는
				</span>
				<div className={s.loginDivider} />
			</Flex>
			<Spacing margin="27px" />
			<Flex align="center" className={cs.naverButtonBox} onClick={handleNaverLogin}>
				<Image
					src={NaverLogo}
					alt="네이버 로고 이미지"
					width={20}
					height={20}
					className={cs.snsLogoStyle}
				/>
				<Button color={vars.color.white} className={cs.naverButtonStyle}>
					네이버 로그인
				</Button>
			</Flex>
			<Spacing margin="10px" />
			<Flex align="center" className={cs.kakaoButtonBox} onClick={handleKakaoLogin}>
				<Image
					src={KakaoLogo}
					alt="카카오 로고 이미지"
					width={24}
					height={20}
					className={cs.snsLogoStyle}
				/>
				<Button color={vars.color.black} className={cs.kakaoButtonStyle}>
					카카오 로그인
				</Button>
			</Flex>
		</div>
	);
};

export default LoginButtons;
