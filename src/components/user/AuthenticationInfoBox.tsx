import * as s from './MyPageStyle.css';

import AuthenticationBox from './AuthenticationBox';
import Spacing from '@/shared/components/layout/Spacing';
import { Button } from '@/shared/components/button';
import Image from 'next/image';
import { KakaoLogo } from '../../../public/svgs';
import { vars } from '@/shared/styles/theme.css';
import { Flex } from '@/shared/components/layout';
import { useEffect } from 'react';

const AuthenticationInfoBox = () => {
	const handleKakaoClick = () => {
		if (window.Kakao) {
			const kakao = window.Kakao;

			if (!kakao.isInitialized()) {
				kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '');
			}

			kakao.Channel.addChannel({
				channelPublicId: '_ZeUTxl',
			});
		}
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
		script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
		script.crossOrigin = 'anonymous';
		script.async = true;
		document.body.appendChild(script);

		script.onerror = () => console.error('카카오 SDK 로드 실패!');

		script.addEventListener('load', () => {
			window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '');
		});

		return () => {
			document.body.removeChild(script);
			script.removeEventListener('load', () => {
				window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '');
			});
		};
	}, []);

	return (
		<div>
			<AuthenticationBox />
			<Spacing margin="40px" />
			<Button color={vars.color.darkGray} className={s.whiteButton} onClick={handleKakaoClick}>
				<Flex justify="center" align="center">
					<Image src={KakaoLogo} alt="카카오 로고 이미지" width={24} height={20} />
					<span style={{ fontSize: '20px', marginLeft: '10px' }}>카카오톡 바로가기</span>
				</Flex>
			</Button>
		</div>
	);
};

export default AuthenticationInfoBox;
