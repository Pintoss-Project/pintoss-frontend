'use client';

import * as cs from '@/shared/styles/common.css';
import * as s from './LoginStyle.css';

import { Button } from '@/shared/components/button';
import { Divider, Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import Image from 'next/image';
import { KakaoLogo, NaverLogo } from '../../../../public/svgs';

const LoginButtons = () => {
	return (
		<div>
			<Button color={vars.color.white} className={cs.lightBlueButton}>
				로그인
			</Button>
			<Spacing margin="25px" />
			<Flex justify="center" align="center">
				<Divider
					color={vars.color['pale-gray']}
					size={1}
					style={{ width: '44%', backgroundColor: 'transparent' }}
				/>
				<span className={s.grayText} style={{ margin: '0px 10px' }}>
					또는
				</span>
				<Divider
					color={vars.color['pale-gray']}
					size={1}
					style={{ width: '44%', backgroundColor: 'transparent' }}
				/>
			</Flex>
			<Spacing margin="27px" />
			<Flex align="center" className={cs.naverButtonBox}>
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
			<Flex align="center" className={cs.kakaoButtonBox}>
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
